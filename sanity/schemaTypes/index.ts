// Schema Types Index
import siteSettings from "./siteSettings";
import experience from "./experience";
import skillCategory from "./skillCategory";
import projectCategory from "./projectCategory";
import education from "./education";
import certification from "./certification";
import post from "./post";
import about from "./about";
import series from "./series";
import resume from "./resume";
import recommendation from "./recommendation";
import lead from "./lead";
import contactRequest from "./contactRequest";

// Content block object types
import callout from "./objects/callout";
import youtubeEmbed from "./objects/youtubeEmbed";
import metricBlock from "./objects/metricBlock";
import dividerBlock from "./objects/dividerBlock";
import ctaButton from "./objects/ctaButton";
import fileDownload from "./objects/fileDownload";
import tableBlock from "./objects/tableBlock";

export const schemaTypes = [
    siteSettings,
    about,
    experience,
    skillCategory,
    projectCategory,
    education,
    certification,
    post,
    series,
    resume,
    recommendation,
    lead,
    contactRequest,
    // Content block objects
    callout,
    youtubeEmbed,
    metricBlock,
    dividerBlock,
    ctaButton,
    fileDownload,
    tableBlock,
];
