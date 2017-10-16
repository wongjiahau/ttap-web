export default class TestManager {
    public GetDataFrom(file: FileName): string {
        return LoadLocalFile(this.GetFileNameOf(file));
    }

    private GetFileNameOf(file: FileName) {
        return "ts/tests/testData/" + file.toString();
    }
}

function LoadLocalFile(fileName: string): string {
    const fs = require("fs");
    const data = fs.readFileSync(fileName);
    return data.toString();
}

export enum FileName {
    jiahau_2017_sept = "jiahau_2017_sept.html",
    heng_2017_sept = "heng_2017_sept.html",
    keli_2017_sept = "keli_2017_sept.html",
    qingsheng_2017_sept = "qingsheng_2017_sept.html",
}
