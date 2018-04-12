import {ParseLargeHtmlToRawSlot} from "../parseLargeHtmlToRawSlot";

describe("nothing", () => {
    it("should parse the file ", (done) => {
        const fs = require("fs");
        // fs.readFile("./new.html", (err, contents) => {
        fs.readFile("./new1.html", (err, contents) => {
            if (err) {
                console.log("Load file error");
                console.log(err);
                return;
            }
            const rawSlots2 = ParseLargeHtmlToRawSlot(contents.toString());
            fs.writeFile("./output3.json", JSON.stringify(rawSlots2), (err2) => {
                if (!err2) {
                    console.log("The file was saved as output.json");
                }
            });
            console.log("File saved succesfully.");
            throw new Error("End this thing");
            done();
        });
    });

});
