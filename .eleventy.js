require('dotenv').config();




const yaml = require("js-yaml");
const { DateTime } = require("luxon");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const htmlmin = require("html-minifier");
const markdownIt = require("markdown-it");

module.exports = function(eleventyConfig) {
    // Configure Eleventy's Markdown library with custom options
    let markdownLib = markdownIt({
      html: true, // Enable HTML in Markdown (important for custom tags or raw HTML)
      breaks: true, // Convert newlines to <br> tags
      linkify: true // Automatically turn URLs into clickable links
    });

    // Set markdown-it as the Markdown library used by Eleventy
    eleventyConfig.setLibrary("md", markdownLib);


  // Add cloudinaryUrl filter
  eleventyConfig.addFilter("cloudinaryUrl", (imagePath) => {
    return `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/${imagePath}`;
  });

  // Add YAML data file support
  eleventyConfig.addDataExtension("yaml", contents => yaml.load(contents));

  // Syntax highlighting for code blocks
  eleventyConfig.addPlugin(syntaxHighlight);

  // Human-readable date filter
  eleventyConfig.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("dd LLL yyyy");
  });

  // Minify HTML files in production
  eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
    if (outputPath && outputPath.endsWith(".html")) {
      return htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      });
    }
    return content;
  });

  eleventyConfig.addCollection("homepage_slideshow", function(collectionApi) {
    return collectionApi.getFilteredByGlob("homepage_slideshow/*.md");
  });

  eleventyConfig.addCollection("exhibitions", function(collectionApi) {
    const exhibitions = collectionApi.getFilteredByGlob("exhibitions/*.md");
    return exhibitions;
  });

  eleventyConfig.addCollection("works", function(collectionApi) {
    const works = collectionApi.getFilteredByGlob("works/*.md");
    return works;
  });

  eleventyConfig.addCollection("publications", function(collectionApi) {
    const publications = collectionApi.getFilteredByGlob("publications/*.md");
    return publications;
  });

  eleventyConfig.addCollection("about", function(collectionApi) {
    const about = collectionApi.getFilteredByGlob("about/*.md");
    return about;
  });

  eleventyConfig.addCollection("contact", function(collectionApi) {
    const contact = collectionApi.getFilteredByGlob("contact/*.md");
    return contact;
  });

  eleventyConfig.addCollection("imprint", function(collectionApi) {
    const imprint = collectionApi.getFilteredByGlob("imprint/*.md");
    return imprint;
  });

  eleventyConfig.addCollection("privacy", function(collectionApi) {
    const privacy = collectionApi.getFilteredByGlob("privacy/*.md");
    return privacy;
  });
  // Passthrough copy for assets
  eleventyConfig.addPassthroughCopy("*.css");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("*.js");
  eleventyConfig.addPassthroughCopy("admin");
  // eleventyConfig.addPassthroughCopy("images/uploads");


  // Set custom directory structure
  return {
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }

  };

};
