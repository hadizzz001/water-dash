

import prisma from "../../../prisma";
import { NextResponse } from "next/server";

export async function main() {
    try {
        await prisma.$connect();

    }
    catch (err) {
        return Error("Database connect unsuccessful")
    }
}

export const GET = async (req: Request, res: NextResponse) => { 
    try { 
        console.time('start') 
        await main();  
        const posts = await prisma.order.findMany({
            orderBy: {
                id: 'desc'
              }
        }); 
        console.timeEnd('start') 

        
        
        
        

        return NextResponse.json({ message: "Success", posts }, { status: 200 });

    }
    catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    }
    finally {
        await prisma.$disconnect();
    }
}; 



 

