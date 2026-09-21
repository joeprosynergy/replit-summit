const BASE = "https://summitbuildings.com";

export function GET() {
  const body = `# Summit Portable Buildings

> Hand-crafted portable buildings in Farmington, Missouri. Free delivery within 50 miles in Missouri, Illinois, Kentucky, and Arkansas. Phone 573-747-4700.

This file is the short map for agents. The full content index is ${BASE}/llms.txt. The sitemap is ${BASE}/sitemap.xml.

Canonical product URLs are ${BASE}/styles/{slug}. Live lot inventory is on ShedSuite, not this domain. /barn is a traditional-shed landing page, not the barn style hub.

## Start here

- [Building styles](${BASE}/styles): Catalog start. Products live under /styles/{slug}.
- [Rent to own](${BASE}/rent-to-own): No credit check, 90 days same as cash, no early payoff, 24 to 60 month terms.
- [Financing](${BASE}/financing): Upgrade installment loans with approved credit, plus the rent-to-own section.
- [Contact](${BASE}/contact-us): Lot address, phone, quote form.
- [Content index](${BASE}/llms.txt): Product notes and canonical URLs.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
