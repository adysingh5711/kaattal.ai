import { getChunkedDocs } from "@/lib/pdf-loader";
import { embedAndStoreDocs } from "@/lib/vector-store";
import { getPinecone } from "@/lib/pinecone-client";

// This operation might fail because indexes likely need
// more time to init, so give some 5 mins after index
// creation and try again.
(async () => {
    try {
        const pineconeClient = await getPinecone();
        console.log("Preparing chunks from document files (PDF/DOCX)");
        const docs = await getChunkedDocs();
        console.log(`Loading ${docs.length} chunks into pinecone...`);
        await embedAndStoreDocs(pineconeClient, docs);
        console.log("Data embedded and stored in pine-cone index");
    } catch (error) {
        console.error("Init client script failed ", error);
    }
})();