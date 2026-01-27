import { useEffect, useRef } from 'react';
import { useCodeSnippets, CodeSnippet } from '@/hooks/useCodeSnippets';

/**
 * CodeSnippetInjector
 * 
 * Injects admin-managed code snippets into the appropriate locations in the DOM.
 * Supports three injection locations:
 * - head: Injects into <head> (for GTM, meta tags, etc.)
 * - body-start: Injects at the start of <body> (for GTM noscript, etc.)
 * - body-end: Injects at the end of <body> (for analytics, etc.)
 * 
 * For GTM, you need TWO snippets:
 * 1. The main GTM script - set location to "head"
 * 2. The noscript fallback - set location to "body-start"
 */
export function CodeSnippetInjector() {
  const { snippets, isLoading } = useCodeSnippets();
  const injectedRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (isLoading) return;

    const enabledSnippets = snippets.filter(s => s.enabled);
    
    enabledSnippets.forEach((snippet) => {
      // Skip if already injected
      if (injectedRef.current.has(snippet.id)) return;
      
      try {
        injectSnippet(snippet);
        injectedRef.current.add(snippet.id);
      } catch (error) {
        console.error(`Failed to inject snippet "${snippet.name}":`, error);
      }
    });
  }, [snippets, isLoading]);

  // This component doesn't render anything
  return null;
}

/**
 * Parses HTML string and extracts script and non-script elements
 */
function parseHTML(html: string): { scripts: Array<{ src?: string; content?: string; attributes: Record<string, string> }>; nonScripts: string } {
  const scripts: Array<{ src?: string; content?: string; attributes: Record<string, string> }> = [];
  let nonScripts = html;
  
  // Extract all script tags with their content
  const scriptRegex = /<script([^>]*)>([\s\S]*?)<\/script>/gi;
  let match;
  
  while ((match = scriptRegex.exec(html)) !== null) {
    const attributesStr = match[1];
    const content = match[2].trim();
    
    // Parse attributes
    const attributes: Record<string, string> = {};
    const attrRegex = /(\w+)(?:=["']([^"']*)["'])?/g;
    let attrMatch;
    while ((attrMatch = attrRegex.exec(attributesStr)) !== null) {
      attributes[attrMatch[1]] = attrMatch[2] || '';
    }
    
    scripts.push({
      src: attributes.src,
      content: content || undefined,
      attributes,
    });
    
    // Remove this script from nonScripts
    nonScripts = nonScripts.replace(match[0], '');
  }
  
  return { scripts, nonScripts: nonScripts.trim() };
}

/**
 * Creates and executes a script element
 */
function createAndExecuteScript(scriptInfo: { src?: string; content?: string; attributes: Record<string, string> }, snippetId: string): HTMLScriptElement {
  const script = document.createElement('script');
  
  // Set attributes (except src which we handle specially)
  Object.entries(scriptInfo.attributes).forEach(([key, value]) => {
    if (key !== 'src') {
      script.setAttribute(key, value);
    }
  });
  
  // Mark as our snippet
  script.setAttribute('data-snippet-id', snippetId);
  
  if (scriptInfo.src) {
    // External script
    script.src = scriptInfo.src;
    script.async = scriptInfo.attributes.async !== undefined;
  } else if (scriptInfo.content) {
    // Inline script - use textContent for execution
    script.textContent = scriptInfo.content;
  }
  
  return script;
}

/**
 * Injects non-script HTML content
 */
function injectNonScriptContent(html: string, location: 'head' | 'body-start' | 'body-end', snippetId: string) {
  if (!html) return;
  
  // Create a container for the content
  const container = document.createElement('div');
  container.innerHTML = html;
  container.setAttribute('data-snippet-id', snippetId);
  container.style.display = 'contents'; // Make container invisible in layout
  
  switch (location) {
    case 'head':
      // For head, we need to move children individually (div not allowed in head)
      Array.from(container.childNodes).forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          (node as Element).setAttribute('data-snippet-id', snippetId);
        }
        document.head.appendChild(node);
      });
      break;
    case 'body-start':
      document.body.insertBefore(container, document.body.firstChild);
      break;
    case 'body-end':
      document.body.appendChild(container);
      break;
  }
}

function injectSnippet(snippet: CodeSnippet) {
  const { scripts, nonScripts } = parseHTML(snippet.code);
  
  // Inject non-script content first (like noscript tags)
  if (nonScripts) {
    injectNonScriptContent(nonScripts, snippet.location, snippet.id);
  }
  
  // Then inject and execute scripts
  scripts.forEach((scriptInfo) => {
    const script = createAndExecuteScript(scriptInfo, snippet.id);
    
    switch (snippet.location) {
      case 'head':
        document.head.appendChild(script);
        break;
      case 'body-start':
        // Insert after any noscript content we just added
        const firstNonSnippet = Array.from(document.body.children).find(
          el => el.getAttribute('data-snippet-id') !== snippet.id
        );
        if (firstNonSnippet) {
          document.body.insertBefore(script, firstNonSnippet);
        } else {
          document.body.insertBefore(script, document.body.firstChild);
        }
        break;
      case 'body-end':
        document.body.appendChild(script);
        break;
    }
  });
}

export default CodeSnippetInjector;
