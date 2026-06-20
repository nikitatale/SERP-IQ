import Analysis from "../models/analysis.js";
import { analyzeSeoData } from "../services/geminiService.js";
import { scrapeUrl } from "../services/scraperService.js";


export const analysisURL = async(req, res) => {
   try {
    
    const {url } = req.body;

    if(!url) return res.status(400).jsoon({success: false, message: "URL is required"});

    let validURL;
    try {
        validURL = new URL(url.startsWith("http") ? url : `https://${url}`);

    } catch (error) {
          return res.status(400).json({success: false, message: "Invalid URL format"});
    }

    const analysis = await Analysis.create({
        userId: req.userId, url: validURL.href, status: "processing"
    });

     res.json({success: true, message: "Analysis Started", analysisId: analysis._id});


     try {
        const scrapeResult = await scrapeUrl(validURL.href)
        
        if(!scrapeResult.success){
            analysis.status = "failed";
            await analysis.save();
            return;
        }

        const aiResult = await analyzeSeoData(scrapeResult.data)

        if(!aiResult.success){
            analysis.status = "failed";
            await analysis.save();
            return;
        }

        analysis.status = "completed";

        analysis.overallScore = aiResult.data.overallScore || 0;
        analysis.categories = aiResult.data.categories || {};
        analysis.metaData = aiResult.data.metaData || {};
        analysis.headings = aiResult.data.headings || {};
        analysis.links = aiResult.data.links || {};
        analysis.images = aiResult.data.images || {};
        analysis.keywords = aiResult.data.keywords || [];
        analysis.issues = aiResult.data.issues || [];
        analysis.loadTime = aiResult.data.loadTime || 0;
        analysis.pageSize = aiResult.data.pageSize || 0;
        analysis.wordCount = aiResult.data.wordCount || 0;
        

         await analysis.save();

     } catch (bgError) {
          console.error("Background analysis error: ", bgError.message);
          try {
            analysis.status = "failed";
            await analysis.save();

          } catch (saveError) {
              console.error("Failed to save failed status: ", saveError.message);
          }
     }


   } catch (error) {
       console.error("Analyze URL Error: ", error.message);
       if(!res.headerSent){
        res.status(500).json({success: false, message: "Server error"});
       }
   }
}


export const getAnalysis = async(req, res) => {
     try {
        const analysis = await Analysis.findOne({_id: req.params.id, userId: req.userId})

        if(!analysis) return res.status(404).json({success: false, message: "Analysis not found"});

        res.json({success: true, analysis});

     } catch (error) {
        console.error("Get analysis error: ", error.message);
        res.status(500).json({success: false, message: "Server error"});
     }
}


export const getAnalyses = async(req, res) => {
       try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const analyses = await Analysis.find({userId: req.userId}).sort({createdAt: -1}).skip(skip).limit(limit).select("-issues -keywords");

        const total = await Analysis.countDocuments({userId: req.userId});

       

        res.json({success: true, analyses, pagination: {page, limit, total, pages: Math.ceil(total / limit)}});

     } catch (error) {
        console.error("Get analyses error: ", error.message);
        res.status(500).json({success: false, message: "Server error"});
     }
}

export const deleteAnalysis = async(req, res) => {
    try {
         await Analysis.findByIdAndDelete({_id: req.params.id, userId: req.userId})

        res.json({success: true, message: "Analysis Deleted!"});

     } catch (error) {
        console.error("Delete analysis error: ", error.message);
        res.status(500).json({success: false, message: "Server error"});
     }
}

