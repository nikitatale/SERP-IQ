

import {GoogleGenAI, Type} from "@google/genai"

const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY})

const seoAnalysisSchema = {
    type: Type.OBJECT,
    properties: {
        overallScore: { type: Type.INTEGER },
        categories: {
            type: Type.OBJECT,
            properties: {
                seo: { type: Type.INTEGER },
                performance: { type: Type.INTEGER },
                accessibility: { type: Type.INTEGER },
                bestPractices: { type: Type.INTEGER },
            },
            required: ["seo", "performance", "accessibility", "bestPractices"],
        },
        keywords: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    word: { type: Type.STRING },
                    count: { type: Type.INTEGER },
                    density: { type: Type.NUMBER },
                },
                required: ["word", "count", "density"],
            },
        },
        issues: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    severity: {
                        type: Type.STRING,
                        format: "enum",
                        enum: ["critical", "warning", "info"],
                    },
                    category: { type: Type.STRING },
                    message: { type: Type.STRING },
                    recommendation: { type: Type.STRING },
                },
                required: ["severity", "category", "message", "recommendation"],
            },
        },
    },
    required: ["overallScore", "categories", "keywords", "issues"],
};


export async function analyzeSeoData(scrapedData) {
    try {
        const meta = scrapedData.metaData;

        const prompt = `You are an expert SEO analyst. Analyze the following website data and provide a comprehensive SEO audit.

Website URL: ${scrapedData.url}
Load Time: ${scrapedData.loadTime}ms
Status Code: ${scrapedData.statusCode}
Page Size: ${Math.round(meta.pageSize / 1024)}KB
Word Count: ${meta.wordCount}

META DATA:
- Title: "${meta.title}" (${meta.title.length} chars)
- Description: "${meta.description}" (${meta.description.length} chars)
- Canonical: "${meta.canonical}"
- Robots: "${meta.robots}"
- OG Title: "${meta.ogTitle}"
- OG Description: "${meta.ogDescription}"
- OG Image: "${meta.ogImage}"
- Twitter Card: "${meta.twitterCard}"
- Viewport: "${meta.viewport}"
- Charset: "${meta.charset}"

HEADINGS:
- H1: ${meta.headings.h1} (texts: ${JSON.stringify(meta.headings.h1Texts)})
- H2: ${meta.headings.h2}
- H3: ${meta.headings.h3}
- H4: ${meta.headings.h4}
- H5: ${meta.headings.h5}
- H6: ${meta.headings.h6}

LINKS:
- Internal: ${meta.links.internal}
- External: ${meta.links.external}
- Total: ${meta.links.total}

IMAGES:
- Total: ${meta.images.total}
- Missing Alt Text: ${meta.images.missingAlt}
- With Alt Text: ${meta.images.withAlt}

PAGE CONTENT (first 3000 chars):
${meta.bodyText}

Scoring guidelines:
- Title: 50-60 chars optimal, must exist
- Description: 150-160 chars optimal, must exist
- H1: exactly 1 is ideal
- Images: all should have alt text
- Load time: <3s good, <5s ok, >5s poor
- Page size: <3MB good
- Must have viewport meta, charset, canonical
- OG tags and Twitter cards are important
- Internal linking is good for SEO
- Word count: >300 words for content pages
- Check heading hierarchy

Severity levels must be exactly one of: "critical", "warning", or "info".
Provide 5-15 issues sorted by severity (critical first). Be specific and actionable with recommendations.
Extract top 10 keywords by frequency from the page content.`;

        const response = await ai.models.generateContent({
            model: 'gemma-4-31b-it',
            contents: [{role: "user", parts: [{text: prompt}]}],
            config: {
                responseMimeType: "application/json",
                responseSchema: seoAnalysisSchema,
            }
        })

        const analysis = JSON.parse(response.text)

        return {success: true, data: analysis}

    } catch (error) {
       console.error("Gemini analysis error: ", error.message);
       return {success: false, error: error.message};   
    }
}
