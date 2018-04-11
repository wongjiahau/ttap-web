export default class TestManager {
    public GetDataFrom(file: FileName): string {
        return LoadFileFromGitHub(this.GetDownloadLinkOf(file));
    }

    private GetDownloadLinkOf(file: FileName) {
        return "https://raw.githubusercontent.com/wongjiahau/ttap-sample-data/master/Archive/" + file.toString();
    }
}

function LoadFileFromGitHub(downloadLink: string): string {
    const request = require("sync-request");
    const res = request("GET", downloadLink);
    return res.getBody().toString();
}

export enum FileName {
    jiahau_2017_sept    = "jiahau_2017_sept.html",
    cf_2017_nov         = "cf_2017_nov.html",
    heng_2017_sept      = "heng_2017_sept.html",
    heng_2017_nov       = "heng_2017_nov.html",
    keli_2017_sept      = "keli_2017_sept.html",
    qingsheng_2017_sept = "qingsheng_2017_sept.html",
    all_fes_slots       = "fes-2018-05-slots.html"
}
