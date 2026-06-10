#!/usr/bin/env bash
# Prod smoke test for summitbuildings.com (used by the team-brain ship pipeline).
# Curl-only: key pages return 200, legacy URLs redirect to the right place,
# and the sitemap stays free of test pages. No secrets required.
set -u

BASE="${BASE_URL:-https://www.summitbuildings.com}"
FAIL=0

check_200() {
  local path="$1"
  local code
  code=$(curl -sS -o /dev/null -w "%{http_code}" -L --max-time 30 "$BASE$path" || echo 000)
  if [ "$code" = "200" ]; then
    echo "OK   200 $path"
  else
    echo "FAIL $code $path"
    FAIL=1
  fi
}

check_redirect() {
  local path="$1" expected="$2"
  local final
  final=$(curl -sS -o /dev/null -w "%{url_effective}" -L --max-time 30 "$BASE$path" || echo "")
  if [ "$final" = "$BASE$expected" ]; then
    echo "OK   $path -> $expected"
  else
    echo "FAIL $path -> $final (expected $BASE$expected)"
    FAIL=1
  fi
}

echo "== Key pages =="
check_200 /
check_200 /traditional
check_200 /why-summit
check_200 /shed-buying-guide
check_200 /financing
check_200 /farmington-mo
check_200 /gallery
check_200 /types
check_200 /cabin
check_200 /utility-shed
check_200 /3d-configurator
check_200 /buyers-guide

echo "== Legacy redirects =="
check_redirect /our-models/cabin /cabin
check_redirect /our-models/utility-shed /utility-shed
check_redirect /farmington /farmington-mo
check_redirect /home /

echo "== Sitemap =="
SITEMAP=$(curl -sS --max-time 30 "$BASE/sitemap.xml" || echo "")
if [ -z "$SITEMAP" ]; then
  echo "FAIL sitemap.xml empty or unreachable"
  FAIL=1
elif echo "$SITEMAP" | grep -qE "trial|welly|newy|working-copy"; then
  echo "FAIL sitemap.xml contains test pages"
  FAIL=1
else
  echo "OK   sitemap.xml clean"
fi

if [ "$FAIL" -ne 0 ]; then
  echo "SMOKE: FAILED"
  exit 1
fi
echo "SMOKE: PASSED"
