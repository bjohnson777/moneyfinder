import React, { useState } from "react";
import Head from "next/head";

const zipToStateMap = {
  "100": "NY",
  "200": "DC",
  "303": "GA",
  "606": "IL",
  "733": "TX",
  "900": "CA",
  "941": "CA",
  // Add more as needed or use an API in production
};

const stateSearchLinks = {
  NY: "https://ouf.osc.state.ny.us/ouf/",
  CA: "https://ucpi.sco.ca.gov/ucp/",
  TX: "https://claimittexas.gov/",
  IL: "https://icash.illinoistreasurer.gov/",
  GA: "https://dor.georgia.gov/unclaimed-property-program",
  DC: "https://dc.findyourunclaimedproperty.com/",
};

export default function MoneyFinder() {
  const [zip, setZip] = useState("");
  const [redirectLink, setRedirectLink] = useState(null);
  const [shareCounts, setShareCounts] = useState({
    twitter: 0,
    facebook: 0,
    whatsapp: 0,
  });

  const handleSearch = (e) => {
    e.preventDefault();
    const zipPrefix = zip.substring(0, 3);
    const state = zipToStateMap[zipPrefix];
    if (state && stateSearchLinks[state]) {
      setRedirectLink(stateSearchLinks[state]);
    } else {
      setRedirectLink("https://unclaimed.org/");
    }
  };

  const shareText = encodeURIComponent(
    "💸 I just found a site that helps you find unclaimed money in your name. It’s free! Check it out here →"
  );
  const shareUrl = encodeURIComponent("https://yourdomain.com");

  const handleShareClick = (platform) => {
    setShareCounts((prevCounts) => ({
      ...prevCounts,
      [platform]: prevCounts[platform] + 1,
    }));
  };

  return (
    <>
      <Head>
        <title key="title">
          Free Money Finder – Search for Unclaimed Cash in Your Name
        </title>
        <meta
          key="description"
          name="description"
          content="Find out if you're owed money from unclaimed funds, rebates, or settlements. Fast, free, and secure."
        />
        <meta
          key="og:title"
          property="og:title"
          content="Free Money Finder – Search for Unclaimed Cash"
        />
        <meta
          key="og:description"
          property="og:description"
          content="Most Americans have unclaimed funds. See if you do too!"
        />
        <meta
          key="og:image"
          property="og:image"
          content="/money-preview.png"
        />
        <meta
          key="og:url"
          property="og:url"
          content="https://yourdomain.com"
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-r from-green-100 to-green-300 flex flex-col items-center p-8">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-green-900 drop-shadow-md">
            💸 Free Money Finder
          </h1>
          <p className="mt-4 text-lg text-green-800 max-w-xl mx-auto">
            Most Americans have unclaimed cash waiting for them. Use our search
            tool to find out if you’re owed money — it’s fast, free, and 100%
            secure.
          </p>
        </header>

        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">
            Search for Unclaimed Funds
          </h2>
          <form className="space-y-4" onSubmit={handleSearch}>
            <div>
              <label
                htmlFor="fullName"
                className="block text-green-700 font-medium mb-1"
              >
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                className="w-full px-4 py-3 rounded-xl border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="zipCode"
                className="block text-green-700 font-medium mb-1"
              >
                ZIP Code
              </label>
              <input
                id="zipCode"
                type="text"
                placeholder="Enter your ZIP code"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-xl font-bold text-lg transition duration-200"
            >
              🔍 Search Now
            </button>
          </form>

          {redirectLink && (
            <div className="mt-6 text-center">
              <p className="text-green-800 font-medium">
                We found a site for your state:
              </p>
              <a
                href={redirectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-700 underline font-semibold mt-2 inline-block"
              >
                Click here to check your unclaimed funds
              </a>
            </div>
          )}
        </div>

       <!-- <section className="mt-10 text-center">
          <h3 className="text-xl font-semibold text-green-800 mb-4">
            📢 Share This Tool
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleShareClick("twitter")}
              className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600"
            >
              Share on Twitter ({shareCounts.twitter})
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleShareClick("facebook")}
              className="bg-blue-700 text-white px-4 py-2 rounded-xl hover:bg-blue-800"
            >
              Share on Facebook ({shareCounts.facebook})
            </a>
            <a
              href={`https://api.whatsapp.com/send?text=${shareText}%20${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleShareClick("whatsapp")}
              className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700"
            >
              Share on WhatsApp ({shareCounts.whatsapp})
            </a>
          </div>

          <div className="mt-6 text-green-800 text-sm">
            <p>
              <strong>Trending:</strong> Twitter ({shareCounts.twitter}) ·
              Facebook ({shareCounts.facebook}) · WhatsApp (
              {shareCounts.whatsapp})
            </p>
          </div>
        </section>  -->

        <section className="mt-16 max-w-3xl text-center">
          <h3 className="text-2xl font-bold text-green-800 mb-6">
            How It Works
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <svg
                className="w-16 h-16 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12a7.5 7.5 0 1115 0 7.5 7.5 0 01-15 0zm7.5-3v6m0 0h.008v.008H12v-.008z"
                />
              </svg>
              <h4 className="font-bold text-lg text-green-700">Step 1: Search</h4>
              <p className="text-green-600 mt-2">
                Enter your name and ZIP to scan official databases for unclaimed
                money.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <svg
                className="w-16 h-16 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6l4 2"
                />
              </svg>
              <h4 className="font-bold text-lg text-green-700">
                Step 2: Discover
::contentReference[oaicite:22]{index=22}
 
