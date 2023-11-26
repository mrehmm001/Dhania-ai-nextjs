import { PGVectorStore } from "langchain/vectorstores/pgvector";
import { PoolConfig } from "pg";
import {OpenAIEmbeddings} from "langchain/embeddings/openai"
import { auth } from "@clerk/nextjs";

/**
 * Returns the user config pool for the pgvector store.
 */
export function getUserPoolConfig(){
    const {userId} = auth();
    if(!userId) return undefined;
    const config = {
        postgresConnectionOptions: {
          type: "postgres",
          host: process.env["PGVECTOR_URL"],
          port: 5432,
          user: "postgres",
          password: process.env["PGVECTOR_PASSWORD"],
          database: "postgres",
          ssl:{
            rejectUnauthorized:false
          },
        } as PoolConfig,
        tableName: userId,
        columns: {
          idColumnName: "id",
          vectorColumnName: "vector",
          contentColumnName: "content",
          metadataColumnName: "metadata",
        },
    };
    return config;
}

/**
 * Initialises the PGVectorStore and returns it 
 */
export async function getPGVectorStore(){
    const config = getUserPoolConfig();
    if(!config) return;

    const pgvectorStore = await PGVectorStore.initialize(
        new OpenAIEmbeddings(),
        config
    );
    return pgvectorStore;
}