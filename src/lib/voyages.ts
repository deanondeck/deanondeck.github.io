/* Virgin Voyages booking deep-links.
   Every link carries Dean's First Mate credentials (agentId 281761) so any
   resulting booking is credited to him. `filter` is a pre-built query fragment
   such as "selectedRegions=CARIBBEAN" or "selectedPorts=DBV,SPU,ATH". */

const SEARCH_BASE = "https://www.virginvoyages.com/book/voyage-planner/find-a-voyage";
const AGENT_PARAMS =
  "cabins=1&currencyCode=USD&agentId=281761&agencyId=54480&bookingChannel=FMLINK";

export function voyageSearch(filter?: string) {
  return filter
    ? `${SEARCH_BASE}?${AGENT_PARAMS}&${filter}`
    : `${SEARCH_BASE}?${AGENT_PARAMS}`;
}
