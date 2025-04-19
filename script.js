async function checkStock() {
    const url = document.getElementById("storeUrl").value;
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "⏳ Scanning...";

    try {
        const response = await fetch(url);
        const text = await response.text();

        // Try to parse "availability": "OutOfStock" from structured data
        const matches = [...text.matchAll(/"availability"\s*:\s*"([^"]+)"/g)];
        const productTitleMatch = text.match(/<title>(.*?)<\/title>/);

        let productTitle = productTitleMatch ? productTitleMatch[1] : "Unknown Product";
        let stockStatus = "In Stock";

        if (matches.some(m => m[1].toLowerCase().includes("outofstock"))) {
            stockStatus = "❌ Out of Stock";
        } else {
            stockStatus = "✅ In Stock";
        }

        resultsDiv.innerHTML = `
          <h3>Scan Result</h3>
          <table>
            <tr><th>Product</th><th>Status</th></tr>
            <tr><td>${productTitle}</td><td>${stockStatus}</td></tr>
          </table>
        `;
    } catch (err) {
        console.error(err);
        resultsDiv.innerHTML = `<p class="error">⚠️ Failed to fetch or parse the page. Try a different URL or check your connection.</p>`;
    }
}