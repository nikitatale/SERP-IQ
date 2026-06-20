
import fetch from "node-fetch";

// used serp api
export async function rankTracker(keyword, targetDomain) {
    try {
        const params = new URLSearchParams({
            q: keyword,
            api_key: process.env.SERPAPI_KEY,
            num: 100,
            hl: "en",
            gl: "us"
        });

        const response = await fetch(`https://serpapi.com/search.json?${params}`);
        const data = await response.json();

        const cleanTarget = targetDomain.replace("www.", "").toLowerCase();
        const results = data.organic_results || [];

        let found = null;
        const allResults = results.map((r, i) => {
            const domain = new URL(r.link).hostname.replace("www.", "");
            const item = {
                position: i + 1,
                url: r.link,
                domain,
                title: r.title || "",
                snippet: r.snippet || "",
            };
            if (!found && (domain.includes(cleanTarget) || cleanTarget.includes(domain))) {
                found = { ...item, page: Math.ceil((i + 1) / 10) };
            }
            return item;
        });

        const competitors = allResults
            .filter(r => !r.domain.includes(cleanTarget) && !cleanTarget.includes(r.domain))
            .slice(0, 10);

        return {
            success: true,
            data: {
                keyword,
                targetDomain,
                position: found?.position || null,
                page: found?.page || null,
                title: found?.title || "",
                snippet: found?.snippet || "",
                competitors,
                totalResultsScanned: allResults.length,
            }
        };

    } catch (error) {
        console.error("Rank check Error: ", error.message);
        return { success: false, error: error.message };
    }
}