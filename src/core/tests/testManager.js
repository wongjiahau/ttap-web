"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TestManager {
    GetDataFrom(file) {
        return LoadFileFromGitHub(this.GetDownloadLinkOf(file));
    }
    GetDownloadLinkOf(file) {
        return "https://raw.githubusercontent.com/wongjiahau/ttap-sample-data/master/Archive/" + file.toString();
    }
}
exports.default = TestManager;
function LoadFileFromGitHub(downloadLink) {
    const request = require("sync-request");
    const res = request("GET", downloadLink);
    return res.getBody().toString();
}
var FileName;
(function (FileName) {
    FileName["jiahau_2017_sept"] = "jiahau_2017_sept.html";
    FileName["cf_2017_nov"] = "cf_2017_nov.html";
    FileName["heng_2017_sept"] = "heng_2017_sept.html";
    FileName["heng_2017_nov"] = "heng_2017_nov.html";
    FileName["keli_2017_sept"] = "keli_2017_sept.html";
    FileName["qingsheng_2017_sept"] = "qingsheng_2017_sept.html";
    FileName["all_fes_slots"] = "fes-2018-05-slots.html";
})(FileName = exports.FileName || (exports.FileName = {}));
//# sourceMappingURL=testManager.js.map