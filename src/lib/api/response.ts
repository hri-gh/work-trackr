import { NextResponse } from "next/server";

export const ApiResponse = {
    success<T>(data: T, message = "Success", status = 200) {
        return NextResponse.json(
            { success: true, message, data },
            { status }
        );
    },

    created<T>(data: T, message = "Created successfully") {
        return NextResponse.json(
            { success: true, message, data },
            { status: 201 }
        );
    },

    error(message = "Something went wrong", status = 500, errors?: any) {
        return NextResponse.json(
            { success: false, message, errors },
            { status }
        );
    },

    noContent() {
        return new NextResponse(null, { status: 204 });
    },
};
