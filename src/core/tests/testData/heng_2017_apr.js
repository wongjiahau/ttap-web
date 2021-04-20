"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CodeOf;
(function (CodeOf) {
    CodeOf["ACD"] = "MPU34072";
    CodeOf["ACP"] = "MPU34022";
    CodeOf["ASSD"] = "UEMX4313";
    CodeOf["BEAM"] = "UKMM1043";
    CodeOf["BKA"] = "MPU32013";
    CodeOf["BMK2"] = "MPU3143";
    CodeOf["CSD2"] = "UEMX2363";
    CodeOf["CT"] = "UEMX4393";
    CodeOf["EAIE"] = "UEMX4963";
    CodeOf["EDC"] = "UEME1252";
    CodeOf["EFE"] = "MPU32043";
    CodeOf["EIS"] = "MPU33183";
    CodeOf["ET1"] = "UEME1112";
    CodeOf["FEMISE"] = "UEMX4293";
    CodeOf["FM1"] = "UEME2123";
    CodeOf["FM2"] = "UEME3112";
    CodeOf["FOP"] = "UECS1643";
    CodeOf["GE"] = "UEMX2423";
    CodeOf["H"] = "UEMX2513";
    CodeOf["HT"] = "UEMX3813";
    CodeOf["IDP"] = "UEMX4913";
    CodeOf["ITBS"] = "UEMX1133";
    CodeOf["ITF"] = "UALF1003";
    CodeOf["ITGL"] = "UALB1003";
    CodeOf["ITJ"] = "UALJ2013";
    CodeOf["ITK"] = "UJLL1093";
    CodeOf["MFE1"] = "UECM1653";
    CodeOf["MFE2"] = "UECM1713";
    CodeOf["MS3"] = "MPU3173";
    CodeOf["NMS"] = "UECM2623";
    CodeOf["S"] = "UEME1132";
    CodeOf["S1"] = "UEMX1843";
    CodeOf["SA2"] = "UEMX2323";
    CodeOf["SEP"] = "MPU34012";
    CodeOf["SSD"] = "UEMX3333";
    CodeOf["SZAOWBS"] = "UKMM1011";
    CodeOf["TITA"] = "MPU3123";
    CodeOf["HE"] = "MPU3113";
})(CodeOf = exports.CodeOf || (exports.CodeOf = {}));
var IndexOf;
(function (IndexOf) {
    IndexOf[IndexOf["ASSD"] = 0] = "ASSD";
    IndexOf[IndexOf["ACD"] = 1] = "ACD";
    IndexOf[IndexOf["ACP"] = 2] = "ACP";
    IndexOf[IndexOf["BKA"] = 3] = "BKA";
    IndexOf[IndexOf["BMK2"] = 4] = "BMK2";
    IndexOf[IndexOf["BEAM"] = 5] = "BEAM";
    IndexOf[IndexOf["CSD2"] = 6] = "CSD2";
    IndexOf[IndexOf["CT"] = 7] = "CT";
    IndexOf[IndexOf["EIS"] = 8] = "EIS";
    IndexOf[IndexOf["EAIE"] = 9] = "EAIE";
    IndexOf[IndexOf["EDC"] = 10] = "EDC";
    IndexOf[IndexOf["ET1"] = 11] = "ET1";
    IndexOf[IndexOf["EFE"] = 12] = "EFE";
    IndexOf[IndexOf["FEMISE"] = 13] = "FEMISE";
    IndexOf[IndexOf["FM1"] = 14] = "FM1";
    IndexOf[IndexOf["FM2"] = 15] = "FM2";
    IndexOf[IndexOf["FOP"] = 16] = "FOP";
    IndexOf[IndexOf["GE"] = 17] = "GE";
    IndexOf[IndexOf["HT"] = 18] = "HT";
    IndexOf[IndexOf["HE"] = 19] = "HE";
    IndexOf[IndexOf["H"] = 20] = "H";
    IndexOf[IndexOf["IDP"] = 21] = "IDP";
    IndexOf[IndexOf["ITBS"] = 22] = "ITBS";
    IndexOf[IndexOf["ITF"] = 23] = "ITF";
    IndexOf[IndexOf["ITGL"] = 24] = "ITGL";
    IndexOf[IndexOf["ITJ"] = 25] = "ITJ";
    IndexOf[IndexOf["ITK"] = 26] = "ITK";
    IndexOf[IndexOf["MS3"] = 27] = "MS3";
    IndexOf[IndexOf["MFE1"] = 28] = "MFE1";
    IndexOf[IndexOf["MFE2"] = 29] = "MFE2";
    IndexOf[IndexOf["NMS"] = 30] = "NMS";
    IndexOf[IndexOf["SEP"] = 31] = "SEP";
    IndexOf[IndexOf["S"] = 32] = "S";
    IndexOf[IndexOf["SA2"] = 33] = "SA2";
    IndexOf[IndexOf["SSD"] = 34] = "SSD";
    IndexOf[IndexOf["SZAOWBS"] = 35] = "SZAOWBS";
    IndexOf[IndexOf["S1"] = 36] = "S1";
    IndexOf[IndexOf["TITA"] = 37] = "TITA";
})(IndexOf = exports.IndexOf || (exports.IndexOf = {}));
let cache = null;
exports.HENG_2017_APR = () => {
    if (cache !== null) {
        return cache;
    }
    cache = [
        {
            Uid: 1,
            SubjectCode: "MPU3113",
            SubjectName: "Hubungan Etnik (for Local Students)",
            Number: "1",
            Type: "L",
            Group: "1",
            Day: "Mon",
            TimePeriod: "  9:00 AM - 12:00 PM",
            WeekNumber: "1-14",
            Room: "KB521"
        }, {
            Uid: 2,
            SubjectCode: "MPU3113",
            SubjectName: "Hubungan Etnik (for Local Students)",
            Number: "2",
            Type: "L",
            Group: "2",
            Day: "Mon",
            TimePeriod: "  2:00 PM -  5:00 PM",
            WeekNumber: "1-14",
            Room: "KB521"
        }, {
            Uid: 3,
            SubjectCode: "MPU3113",
            SubjectName: "Hubungan Etnik (for Local Students)",
            Number: "3",
            Type: "L",
            Group: "3",
            Day: "Tue",
            TimePeriod: "  2:00 PM -  5:00 PM",
            WeekNumber: "1-14",
            Room: "KB520"
        }, {
            Uid: 4,
            SubjectCode: "MPU3113",
            SubjectName: "Hubungan Etnik (for Local Students)",
            Number: "4",
            Type: "L",
            Group: "4",
            Day: "Thu",
            TimePeriod: "  8:00 AM - 11:00 AM",
            WeekNumber: "1-14",
            Room: "KB316"
        }, {
            Uid: 5,
            SubjectCode: "MPU3123",
            SubjectName: "Tamadun Islam Dan Tamadun Asia (titas)",
            Number: "5",
            Type: "L",
            Group: "1",
            Day: "Mon",
            TimePeriod: "  9:00 AM - 12:00 PM",
            WeekNumber: "1-14",
            Room: "KB520"
        }, {
            Uid: 6,
            SubjectCode: "MPU3123",
            SubjectName: "Tamadun Islam Dan Tamadun Asia (titas)",
            Number: "6",
            Type: "L",
            Group: "2",
            Day: "Tue",
            TimePeriod: "  9:00 AM - 12:00 PM",
            WeekNumber: "1-14",
            Room: "KB520"
        }, {
            Uid: 7,
            SubjectCode: "MPU3123",
            SubjectName: "Tamadun Islam Dan Tamadun Asia (titas)",
            Number: "7",
            Type: "L",
            Group: "3",
            Day: "Tue",
            TimePeriod: "  9:00 AM - 12:00 PM",
            WeekNumber: "1-14",
            Room: "KB521"
        }, {
            Uid: 8,
            SubjectCode: "MPU3123",
            SubjectName: "Tamadun Islam Dan Tamadun Asia (titas)",
            Number: "8",
            Type: "L",
            Group: "4",
            Day: "Thu",
            TimePeriod: "  2:00 PM -  5:00 PM",
            WeekNumber: "1-14",
            Room: "KB316"
        }, {
            Uid: 9,
            SubjectCode: "MPU3143",
            SubjectName: "Bahasa Melayu Komunikasi 2",
            Number: "9",
            Type: "L",
            Group: "1",
            Day: "Thu",
            TimePeriod: "  2:00 PM -  5:00 PM",
            WeekNumber: "1-14",
            Room: "KB318"
        }, {
            Uid: 10,
            SubjectCode: "MPU3173",
            SubjectName: "Malaysian Studies 3 (for International Students)",
            Number: "10",
            Type: "L",
            Group: "1",
            Day: "Thu",
            TimePeriod: "  8:00 AM - 11:00 AM",
            WeekNumber: "1-14",
            Room: "KB318"
        }, {
            Uid: 11,
            SubjectCode: "MPU32013",
            SubjectName: "Bahasa Kebangsaan A",
            Number: "11",
            Type: "L",
            Group: "1",
            Day: "Tue",
            TimePeriod: "  9:00 AM - 12:00 PM",
            WeekNumber: "1-14",
            Room: "KB314"
        }, {
            Uid: 12,
            SubjectCode: "MPU32043",
            SubjectName: "English For Engineering",
            Number: "12",
            Type: "L",
            Group: "1",
            Day: "Mon",
            TimePeriod: " 12:00 PM -  2:00 PM",
            WeekNumber: "1-14",
            Room: "KB324"
        }, {
            Uid: 13,
            SubjectCode: "MPU32043",
            SubjectName: "English For Engineering",
            Number: "13",
            Type: "L",
            Group: "2",
            Day: "Wed",
            TimePeriod: "  2:00 PM -  4:00 PM",
            WeekNumber: "1-14",
            Room: "KB323"
        }, {
            Uid: 14,
            SubjectCode: "MPU32043",
            SubjectName: "English For Engineering",
            Number: "14",
            Type: "L",
            Group: "5",
            Day: "Thu",
            TimePeriod: "  5:00 PM -  7:00 PM",
            WeekNumber: "1-14",
            Room: "KB300"
        }, {
            Uid: 15,
            SubjectCode: "MPU32043",
            SubjectName: "English For Engineering",
            Number: "15",
            Type: "T",
            Group: "1",
            Day: "Mon",
            TimePeriod: "  5:00 PM -  6:00 PM",
            WeekNumber: "1-14",
            Room: "KB324"
        }, {
            Uid: 16,
            SubjectCode: "MPU32043",
            SubjectName: "English For Engineering",
            Number: "16",
            Type: "T",
            Group: "7",
            Day: "Thu",
            TimePeriod: "  1:00 PM -  2:00 PM",
            WeekNumber: "1-14",
            Room: "KB322"
        }, {
            Uid: 17,
            SubjectCode: "MPU33183",
            SubjectName: "Engineer In Society",
            Number: "17",
            Type: "L",
            Group: "1",
            Day: "Tue",
            TimePeriod: " 11:00 AM -  2:00 PM",
            WeekNumber: "1-14",
            Room: "KB209"
        }, {
            Uid: 18,
            SubjectCode: "MPU33183",
            SubjectName: "Engineer In Society",
            Number: "18",
            Type: "L",
            Group: "2",
            Day: "Thu",
            TimePeriod: " 12:00 PM -  3:00 PM",
            WeekNumber: "1-14",
            Room: "KB208"
        }, {
            Uid: 19,
            SubjectCode: "MPU34012",
            SubjectName: "Social Entrepreneurship Project",
            Number: "19",
            Type: "L",
            Group: "1",
            Day: "Mon",
            TimePeriod: "  9:00 AM - 11:00 AM",
            WeekNumber: "1-14",
            Room: "KB322"
        }, {
            Uid: 20,
            SubjectCode: "MPU34022",
            SubjectName: "Arts & Cultural Performance",
            Number: "20",
            Type: "L",
            Group: "1",
            Day: "Mon",
            TimePeriod: "  9:00 AM - 11:00 AM",
            WeekNumber: "1-14",
            Room: "KB314"
        }, {
            Uid: 21,
            SubjectCode: "MPU34072",
            SubjectName: "Art, Craft, & Design",
            Number: "21",
            Type: "L",
            Group: "1",
            Day: "Mon",
            TimePeriod: "  2:00 PM -  4:00 PM",
            WeekNumber: "1-14",
            Room: "KB322"
        }, {
            Uid: 22,
            SubjectCode: "UALB1003",
            SubjectName: "Introduction To German Language",
            Number: "22",
            Type: "L",
            Group: "1",
            Day: "Mon",
            TimePeriod: "  5:00 PM -  7:00 PM",
            WeekNumber: "1-14",
            Room: "KB322"
        }, {
            Uid: 23,
            SubjectCode: "UALB1003",
            SubjectName: "Introduction To German Language",
            Number: "23",
            Type: "L",
            Group: "2",
            Day: "Wed",
            TimePeriod: "  5:00 PM -  7:00 PM",
            WeekNumber: "1-14",
            Room: "KB323"
        }, {
            Uid: 24,
            SubjectCode: "UALB1003",
            SubjectName: "Introduction To German Language",
            Number: "24",
            Type: "T",
            Group: "1",
            Day: "Tue",
            TimePeriod: "  5:00 PM -  6:00 PM",
            WeekNumber: "1-14",
            Room: "KB318"
        }, {
            Uid: 25,
            SubjectCode: "UALB1003",
            SubjectName: "Introduction To German Language",
            Number: "25",
            Type: "T",
            Group: "2",
            Day: "Tue",
            TimePeriod: "  6:00 PM -  7:00 PM",
            WeekNumber: "1-14",
            Room: "KB318"
        }, {
            Uid: 26,
            SubjectCode: "UALB1003",
            SubjectName: "Introduction To German Language",
            Number: "26",
            Type: "T",
            Group: "3",
            Day: "Thu",
            TimePeriod: "  5:00 PM -  6:00 PM",
            WeekNumber: "1-14",
            Room: "KB318"
        }, {
            Uid: 27,
            SubjectCode: "UALB1003",
            SubjectName: "Introduction To German Language",
            Number: "27",
            Type: "T",
            Group: "4",
            Day: "Thu",
            TimePeriod: "  6:00 PM -  7:00 PM",
            WeekNumber: "1-14",
            Room: "KB318"
        }, {
            Uid: 28,
            SubjectCode: "UALF1003",
            SubjectName: "Introduction To French",
            Number: "28",
            Type: "L",
            Group: "1",
            Day: "Mon",
            TimePeriod: "  8:00 AM - 10:00 AM",
            WeekNumber: "1-14",
            Room: "KB324"
        }, {
            Uid: 29,
            SubjectCode: "UALF1003",
            SubjectName: "Introduction To French",
            Number: "29",
            Type: "L",
            Group: "2",
            Day: "Tue",
            TimePeriod: "  9:00 AM - 11:00 AM",
            WeekNumber: "1-14",
            Room: "KB323"
        }, {
            Uid: 30,
            SubjectCode: "UALF1003",
            SubjectName: "Introduction To French",
            Number: "30",
            Type: "T",
            Group: "1",
            Day: "Mon",
            TimePeriod: " 10:00 AM - 11:00 AM",
            WeekNumber: "1-14",
            Room: "KB318"
        }, {
            Uid: 31,
            SubjectCode: "UALF1003",
            SubjectName: "Introduction To French",
            Number: "31",
            Type: "T",
            Group: "2",
            Day: "Mon",
            TimePeriod: " 11:00 AM - 12:00 PM",
            WeekNumber: "1-14",
            Room: "KB318"
        }, {
            Uid: 32,
            SubjectCode: "UALF1003",
            SubjectName: "Introduction To French",
            Number: "32",
            Type: "T",
            Group: "3",
            Day: "Tue",
            TimePeriod: " 11:00 AM - 12:00 PM",
            WeekNumber: "1-14",
            Room: "KB319"
        }, {
            Uid: 33,
            SubjectCode: "UALF1003",
            SubjectName: "Introduction To French",
            Number: "33",
            Type: "T",
            Group: "4",
            Day: "Tue",
            TimePeriod: " 12:00 PM -  1:00 PM",
            WeekNumber: "1-14",
            Room: "KB319"
        }, {
            Uid: 34,
            SubjectCode: "UALJ2013",
            SubjectName: "Introduction To Japanese",
            Number: "34",
            Type: "L",
            Group: "1",
            Day: "Wed",
            TimePeriod: "  8:00 AM - 10:00 AM",
            WeekNumber: "1-14",
            Room: "KB324"
        }, {
            Uid: 35,
            SubjectCode: "UALJ2013",
            SubjectName: "Introduction To Japanese",
            Number: "35",
            Type: "T",
            Group: "1",
            Day: "Wed",
            TimePeriod: " 10:00 AM - 11:00 AM",
            WeekNumber: "1-14",
            Room: "KB318"
        }, {
            Uid: 36,
            SubjectCode: "UALJ2013",
            SubjectName: "Introduction To Japanese",
            Number: "36",
            Type: "T",
            Group: "2",
            Day: "Wed",
            TimePeriod: " 11:00 AM - 12:00 PM",
            WeekNumber: "1-14",
            Room: "KB318"
        }, {
            Uid: 37,
            SubjectCode: "UECM1653",
            SubjectName: "Mathematics For Engineering I",
            Number: "37",
            Type: "L",
            Group: "4",
            Day: "Mon",
            TimePeriod: "  2:00 PM -  4:00 PM",
            WeekNumber: "1-14",
            Room: "KB520"
        }, {
            Uid: 38,
            SubjectCode: "UECM1653",
            SubjectName: "Mathematics For Engineering I",
            Number: "37",
            Type: "L",
            Group: "4",
            Day: "Tue",
            TimePeriod: "  8:00 AM -  9:00 AM",
            WeekNumber: "1-14",
            Room: "KB520"
        }, {
            Uid: 39,
            SubjectCode: "UECM1653",
            SubjectName: "Mathematics For Engineering I",
            Number: "38",
            Type: "T",
            Group: "8",
            Day: "Tue",
            TimePeriod: "  9:00 AM - 10:00 AM",
            WeekNumber: "1-14",
            Room: "KB519"
        }, {
            Uid: 40,
            SubjectCode: "UECM1653",
            SubjectName: "Mathematics For Engineering I",
            Number: "39",
            Type: "T",
            Group: "11",
            Day: "Mon",
            TimePeriod: "  5:00 PM -  6:00 PM",
            WeekNumber: "1-14",
            Room: "KB519"
        }, {
            Uid: 41,
            SubjectCode: "UECM1713",
            SubjectName: "Mathematics For Engineering II",
            Number: "40",
            Type: "L",
            Group: "1",
            Day: "Mon",
            TimePeriod: " 10:00 AM - 11:00 AM",
            WeekNumber: "1-14",
            Room: "KB213"
        }, {
            Uid: 42,
            SubjectCode: "UECM1713",
            SubjectName: "Mathematics For Engineering II",
            Number: "40",
            Type: "L",
            Group: "1",
            Day: "Wed",
            TimePeriod: " 12:00 PM -  2:00 PM",
            WeekNumber: "1-14",
            Room: "KB214"
        }, {
            Uid: 43,
            SubjectCode: "UECM1713",
            SubjectName: "Mathematics For Engineering II",
            Number: "41",
            Type: "L",
            Group: "2",
            Day: "Mon",
            TimePeriod: " 12:00 PM -  2:00 PM",
            WeekNumber: "1-14",
            Room: "KB214"
        }, {
            Uid: 44,
            SubjectCode: "UECM1713",
            SubjectName: "Mathematics For Engineering II",
            Number: "41",
            Type: "L",
            Group: "2",
            Day: "Wed",
            TimePeriod: "  8:00 AM -  9:00 AM",
            WeekNumber: "1-14",
            Room: "KB209"
        }, {
            Uid: 45,
            SubjectCode: "UECM1713",
            SubjectName: "Mathematics For Engineering II",
            Number: "42",
            Type: "T",
            Group: "1",
            Day: "Mon",
            TimePeriod: "  8:00 AM -  9:00 AM",
            WeekNumber: "1-14",
            Room: "KB318"
        }, {
            Uid: 46,
            SubjectCode: "UECM1713",
            SubjectName: "Mathematics For Engineering II",
            Number: "43",
            Type: "T",
            Group: "2",
            Day: "Mon",
            TimePeriod: "  9:00 AM - 10:00 AM",
            WeekNumber: "1-14",
            Room: "KB318"
        }, {
            Uid: 47,
            SubjectCode: "UECM1713",
            SubjectName: "Mathematics For Engineering II",
            Number: "44",
            Type: "T",
            Group: "3",
            Day: "Wed",
            TimePeriod: "  9:00 AM - 10:00 AM",
            WeekNumber: "1-14",
            Room: "KB314"
        }, {
            Uid: 48,
            SubjectCode: "UECM1713",
            SubjectName: "Mathematics For Engineering II",
            Number: "45",
            Type: "T",
            Group: "4",
            Day: "Wed",
            TimePeriod: "  2:00 PM -  3:00 PM",
            WeekNumber: "1-14",
            Room: "KB210"
        }, {
            Uid: 49,
            SubjectCode: "UECM1713",
            SubjectName: "Mathematics For Engineering II",
            Number: "46",
            Type: "T",
            Group: "5",
            Day: "Mon",
            TimePeriod: "  3:00 PM -  4:00 PM",
            WeekNumber: "1-14",
            Room: "KB523"
        }, {
            Uid: 50,
            SubjectCode: "UECM1713",
            SubjectName: "Mathematics For Engineering II",
            Number: "47",
            Type: "T",
            Group: "6",
            Day: "Wed",
            TimePeriod: "  4:00 PM -  5:00 PM",
            WeekNumber: "1-14",
            Room: "KB314"
        }, {
            Uid: 51,
            SubjectCode: "UECM1713",
            SubjectName: "Mathematics For Engineering II",
            Number: "48",
            Type: "T",
            Group: "7",
            Day: "Thu",
            TimePeriod: " 10:00 AM - 11:00 AM",
            WeekNumber: "1-14",
            Room: "KB519"
        }, {
            Uid: 52,
            SubjectCode: "UECM1713",
            SubjectName: "Mathematics For Engineering II",
            Number: "49",
            Type: "T",
            Group: "8",
            Day: "Thu",
            TimePeriod: "  1:00 PM -  2:00 PM",
            WeekNumber: "1-14",
            Room: "KB523"
        }, {
            Uid: 53,
            SubjectCode: "UECM1713",
            SubjectName: "Mathematics For Engineering II",
            Number: "50",
            Type: "T",
            Group: "9",
            Day: "Thu",
            TimePeriod: "  3:00 PM -  4:00 PM",
            WeekNumber: "1-14",
            Room: "KB320"
        }, {
            Uid: 54,
            SubjectCode: "UECM1713",
            SubjectName: "Mathematics For Engineering II",
            Number: "51",
            Type: "T",
            Group: "10",
            Day: "Thu",
            TimePeriod: "  4:00 PM -  5:00 PM",
            WeekNumber: "1-14",
            Room: "KB320"
        }, {
            Uid: 55,
            SubjectCode: "UECM1713",
            SubjectName: "Mathematics For Engineering II",
            Number: "52",
            Type: "T",
            Group: "11",
            Day: "Thu",
            TimePeriod: "  6:00 PM -  7:00 PM",
            WeekNumber: "1-14",
            Room: "KB319"
        }, {
            Uid: 56,
            SubjectCode: "UECM1713",
            SubjectName: "Mathematics For Engineering II",
            Number: "53",
            Type: "T",
            Group: "12",
            Day: "Tue",
            TimePeriod: "  8:00 AM -  9:00 AM",
            WeekNumber: "1-14",
            Room: "KB519"
        }, {
            Uid: 57,
            SubjectCode: "UECM1713",
            SubjectName: "Mathematics For Engineering II",
            Number: "54",
            Type: "T",
            Group: "13",
            Day: "Fri",
            TimePeriod: "  2:30 PM -  3:30 PM",
            WeekNumber: "1-14",
            Room: "KB524"
        }, {
            Uid: 58,
            SubjectCode: "UECM1713",
            SubjectName: "Mathematics For Engineering II",
            Number: "55",
            Type: "T",
            Group: "14",
            Day: "Fri",
            TimePeriod: "  3:30 PM -  4:30 PM",
            WeekNumber: "1-14",
            Room: "KB524"
        }, {
            Uid: 59,
            SubjectCode: "UECM2623",
            SubjectName: "Numerical Methods & Statistics",
            Number: "56",
            Type: "L",
            Group: "1",
            Day: "Tue",
            TimePeriod: "  9:00 AM - 11:00 AM",
            WeekNumber: "1-14",
            Room: "KB213"
        }, {
            Uid: 60,
            SubjectCode: "UECM2623",
            SubjectName: "Numerical Methods & Statistics",
            Number: "56",
            Type: "L",
            Group: "1",
            Day: "Thu",
            TimePeriod: "  8:00 AM -  9:00 AM",
            WeekNumber: "1-14",
            Room: "KB209"
        }, {
            Uid: 61,
            SubjectCode: "UECM2623",
            SubjectName: "Numerical Methods & Statistics",
            Number: "57",
            Type: "L",
            Group: "2",
            Day: "Tue",
            TimePeriod: "  2:00 PM -  4:00 PM",
            WeekNumber: "1-14",
            Room: "KB213"
        }, {
            Uid: 62,
            SubjectCode: "UECM2623",
            SubjectName: "Numerical Methods & Statistics",
            Number: "57",
            Type: "L",
            Group: "2",
            Day: "Thu",
            TimePeriod: " 10:00 AM - 11:00 AM",
            WeekNumber: "1-14",
            Room: "KB214"
        }, {
            Uid: 63,
            SubjectCode: "UECM2623",
            SubjectName: "Numerical Methods & Statistics",
            Number: "58",
            Type: "T",
            Group: "1",
            Day: "Mon",
            TimePeriod: " 11:00 AM - 12:00 PM",
            WeekNumber: "1-14",
            Room: "KB516"
        }, {
            Uid: 64,
            SubjectCode: "UECM2623",
            SubjectName: "Numerical Methods & Statistics",
            Number: "59",
            Type: "T",
            Group: "2",
            Day: "Tue",
            TimePeriod: " 11:00 AM - 12:00 PM",
            WeekNumber: "1-14",
            Room: "KB323"
        }, {
            Uid: 65,
            SubjectCode: "UECM2623",
            SubjectName: "Numerical Methods & Statistics",
            Number: "60",
            Type: "T",
            Group: "3",
            Day: "Tue",
            TimePeriod: " 12:00 PM -  1:00 PM",
            WeekNumber: "1-14",
            Room: "KB314"
        }, {
            Uid: 66,
            SubjectCode: "UECM2623",
            SubjectName: "Numerical Methods & Statistics",
            Number: "61",
            Type: "T",
            Group: "4",
            Day: "Tue",
            TimePeriod: "  5:00 PM -  6:00 PM",
            WeekNumber: "1-14",
            Room: "KB523"
        }, {
            Uid: 67,
            SubjectCode: "UECM2623",
            SubjectName: "Numerical Methods & Statistics",
            Number: "62",
            Type: "T",
            Group: "5",
            Day: "Thu",
            TimePeriod: "  5:00 PM -  6:00 PM",
            WeekNumber: "1-14",
            Room: "KB519"
        }, {
            Uid: 68,
            SubjectCode: "UECM2623",
            SubjectName: "Numerical Methods & Statistics",
            Number: "63",
            Type: "T",
            Group: "6",
            Day: "Thu",
            TimePeriod: " 12:00 PM -  1:00 PM",
            WeekNumber: "1-14",
            Room: "KB324"
        }, {
            Uid: 69,
            SubjectCode: "UECM2623",
            SubjectName: "Numerical Methods & Statistics",
            Number: "64",
            Type: "T",
            Group: "7",
            Day: "Thu",
            TimePeriod: "  4:00 PM -  5:00 PM",
            WeekNumber: "1-14",
            Room: "KB321"
        }, {
            Uid: 70,
            SubjectCode: "UECM2623",
            SubjectName: "Numerical Methods & Statistics",
            Number: "65",
            Type: "T",
            Group: "8",
            Day: "Tue",
            TimePeriod: "  5:00 PM -  6:00 PM",
            WeekNumber: "1-14",
            Room: "KB520"
        }, {
            Uid: 71,
            SubjectCode: "UECM2623",
            SubjectName: "Numerical Methods & Statistics",
            Number: "66",
            Type: "T",
            Group: "9",
            Day: "Thu",
            TimePeriod: "  3:00 PM -  4:00 PM",
            WeekNumber: "1-14",
            Room: "KB518"
        }, {
            Uid: 72,
            SubjectCode: "UECM2623",
            SubjectName: "Numerical Methods & Statistics",
            Number: "67",
            Type: "T",
            Group: "10",
            Day: "Thu",
            TimePeriod: "  5:00 PM -  6:00 PM",
            WeekNumber: "1-14",
            Room: "KB320"
        }, {
            Uid: 73,
            SubjectCode: "UECM2623",
            SubjectName: "Numerical Methods & Statistics",
            Number: "68",
            Type: "T",
            Group: "11",
            Day: "Mon",
            TimePeriod: " 11:00 AM - 12:00 PM",
            WeekNumber: "1-14",
            Room: "KB314"
        }, {
            Uid: 74,
            SubjectCode: "UECM2623",
            SubjectName: "Numerical Methods & Statistics",
            Number: "69",
            Type: "T",
            Group: "12",
            Day: "Mon",
            TimePeriod: " 10:00 AM - 11:00 AM",
            WeekNumber: "1-14",
            Room: "KB516"
        }, {
            Uid: 75,
            SubjectCode: "UECM2623",
            SubjectName: "Numerical Methods & Statistics",
            Number: "70",
            Type: "T",
            Group: "13",
            Day: "Wed",
            TimePeriod: " 12:00 PM -  1:00 PM",
            WeekNumber: "1-14",
            Room: "KB519"
        }, {
            Uid: 76,
            SubjectCode: "UECM2623",
            SubjectName: "Numerical Methods & Statistics",
            Number: "71",
            Type: "T",
            Group: "14",
            Day: "Wed",
            TimePeriod: "  1:00 PM -  2:00 PM",
            WeekNumber: "1-14",
            Room: "KB524"
        }, {
            Uid: 77,
            SubjectCode: "UECS1643",
            SubjectName: "Fundamentals Of Programming",
            Number: "72",
            Type: "L",
            Group: "2",
            Day: "Tue",
            TimePeriod: "  4:00 PM -  6:30 PM",
            WeekNumber: "1-14",
            Room: "KB213"
        }, {
            Uid: 78,
            SubjectCode: "UECS1643",
            SubjectName: "Fundamentals Of Programming",
            Number: "73",
            Type: "P",
            Group: "6",
            Day: "Mon",
            TimePeriod: "  9:00 AM - 11:00 AM",
            WeekNumber: "1-2,4,6-14",
            Room: "KB605"
        }, {
            Uid: 79,
            SubjectCode: "UECS1643",
            SubjectName: "Fundamentals Of Programming",
            Number: "74",
            Type: "P",
            Group: "10",
            Day: "Thu",
            TimePeriod: "  3:00 PM -  5:00 PM",
            WeekNumber: "1-4,6-14",
            Room: "KB605"
        }, {
            Uid: 80,
            SubjectCode: "UECS1643",
            SubjectName: "Fundamentals Of Programming",
            Number: "75",
            Type: "P",
            Group: "13",
            Day: "Wed",
            TimePeriod: "  9:00 AM - 11:00 AM",
            WeekNumber: "1-4,6-14",
            Room: "KB606"
        }, {
            Uid: 81,
            SubjectCode: "UECS1643",
            SubjectName: "Fundamentals Of Programming",
            Number: "76",
            Type: "P",
            Group: "14",
            Day: "Thu",
            TimePeriod: "  9:00 AM - 11:00 AM",
            WeekNumber: "1-4,6-14",
            Room: "KB608"
        }, {
            Uid: 82,
            SubjectCode: "UECS1643",
            SubjectName: "Fundamentals Of Programming",
            Number: "77",
            Type: "P",
            Group: "15",
            Day: "Thu",
            TimePeriod: "  3:00 PM -  5:00 PM",
            WeekNumber: "1-4,6-14",
            Room: "KB606"
        }, {
            Uid: 83,
            SubjectCode: "UEME1112",
            SubjectName: "Engineering Thermodynamics I",
            Number: "80",
            Type: "L",
            Group: "1",
            Day: "Mon",
            TimePeriod: "  8:00 AM - 10:00 AM",
            WeekNumber: "1-14",
            Room: "KB209"
        }, {
            Uid: 84,
            SubjectCode: "UEME1112",
            SubjectName: "Engineering Thermodynamics I",
            Number: "81",
            Type: "L",
            Group: "3",
            Day: "Fri",
            TimePeriod: " 10:30 AM - 12:30 PM",
            WeekNumber: "1-14",
            Room: "KB208"
        }, {
            Uid: 85,
            SubjectCode: "UEME1112",
            SubjectName: "Engineering Thermodynamics I",
            Number: "82",
            Type: "P",
            Group: "5",
            Day: "Mon",
            TimePeriod: "  2:00 PM -  5:00 PM",
            WeekNumber: "2,8",
            Room: "KB731"
        }, {
            Uid: 86,
            SubjectCode: "UEME1112",
            SubjectName: "Engineering Thermodynamics I",
            Number: "83",
            Type: "P",
            Group: "6",
            Day: "Mon",
            TimePeriod: "  2:00 PM -  5:00 PM",
            WeekNumber: "4,10",
            Room: "KB731"
        }, {
            Uid: 87,
            SubjectCode: "UEME1112",
            SubjectName: "Engineering Thermodynamics I",
            Number: "84",
            Type: "P",
            Group: "7",
            Day: "Mon",
            TimePeriod: "  2:00 PM -  5:00 PM",
            WeekNumber: "6,12",
            Room: "KB731"
        }, {
            Uid: 88,
            SubjectCode: "UEME1112",
            SubjectName: "Engineering Thermodynamics I",
            Number: "85",
            Type: "P",
            Group: "8",
            Day: "Mon",
            TimePeriod: "  2:00 PM -  5:00 PM",
            WeekNumber: "7,11",
            Room: "KB731"
        }, {
            Uid: 89,
            SubjectCode: "UEME1112",
            SubjectName: "Engineering Thermodynamics I",
            Number: "86",
            Type: "P",
            Group: "14",
            Day: "Tue",
            TimePeriod: "  2:00 PM -  5:00 PM",
            WeekNumber: "2,8",
            Room: "KB731"
        }, {
            Uid: 90,
            SubjectCode: "UEME1112",
            SubjectName: "Engineering Thermodynamics I",
            Number: "87",
            Type: "P",
            Group: "15",
            Day: "Tue",
            TimePeriod: "  2:00 PM -  5:00 PM",
            WeekNumber: "3,9",
            Room: "KB731"
        }, {
            Uid: 91,
            SubjectCode: "UEME1112",
            SubjectName: "Engineering Thermodynamics I",
            Number: "88",
            Type: "P",
            Group: "16",
            Day: "Tue",
            TimePeriod: "  2:00 PM -  5:00 PM",
            WeekNumber: "4,10",
            Room: "KB731"
        }, {
            Uid: 92,
            SubjectCode: "UEME1112",
            SubjectName: "Engineering Thermodynamics I",
            Number: "89",
            Type: "P",
            Group: "17",
            Day: "Tue",
            TimePeriod: "  2:00 PM -  5:00 PM",
            WeekNumber: "6,12",
            Room: "KB731"
        }, {
            Uid: 93,
            SubjectCode: "UEME1112",
            SubjectName: "Engineering Thermodynamics I",
            Number: "90",
            Type: "P",
            Group: "18",
            Day: "Tue",
            TimePeriod: "  2:00 PM -  5:00 PM",
            WeekNumber: "7,11",
            Room: "KB731"
        }, {
            Uid: 94,
            SubjectCode: "UEME1112",
            SubjectName: "Engineering Thermodynamics I",
            Number: "91",
            Type: "P",
            Group: "19",
            Day: "Wed",
            TimePeriod: "  9:00 AM - 12:00 PM",
            WeekNumber: "2,8",
            Room: "KB731"
        }, {
            Uid: 95,
            SubjectCode: "UEME1112",
            SubjectName: "Engineering Thermodynamics I",
            Number: "92",
            Type: "P",
            Group: "20",
            Day: "Wed",
            TimePeriod: "  9:00 AM - 12:00 PM",
            WeekNumber: "3,9",
            Room: "KB731"
        }, {
            Uid: 96,
            SubjectCode: "UEME1112",
            SubjectName: "Engineering Thermodynamics I",
            Number: "93",
            Type: "P",
            Group: "21",
            Day: "Wed",
            TimePeriod: "  9:00 AM - 12:00 PM",
            WeekNumber: "4,10",
            Room: "KB731"
        }, {
            Uid: 97,
            SubjectCode: "UEME1112",
            SubjectName: "Engineering Thermodynamics I",
            Number: "94",
            Type: "P",
            Group: "22",
            Day: "Wed",
            TimePeriod: "  9:00 AM - 12:00 PM",
            WeekNumber: "6,12",
            Room: "KB731"
        }, {
            Uid: 98,
            SubjectCode: "UEME1112",
            SubjectName: "Engineering Thermodynamics I",
            Number: "95",
            Type: "P",
            Group: "24",
            Day: "Wed",
            TimePeriod: "  2:00 PM -  5:00 PM",
            WeekNumber: "2,8",
            Room: "KB731"
        }, {
            Uid: 99,
            SubjectCode: "UEME1112",
            SubjectName: "Engineering Thermodynamics I",
            Number: "96",
            Type: "P",
            Group: "25",
            Day: "Wed",
            TimePeriod: "  2:00 PM -  5:00 PM",
            WeekNumber: "3,9",
            Room: "KB731"
        }, {
            Uid: 100,
            SubjectCode: "UEME1112",
            SubjectName: "Engineering Thermodynamics I",
            Number: "97",
            Type: "P",
            Group: "26",
            Day: "Wed",
            TimePeriod: "  2:00 PM -  5:00 PM",
            WeekNumber: "4,10",
            Room: "KB731"
        }, {
            Uid: 101,
            SubjectCode: "UEME1112",
            SubjectName: "Engineering Thermodynamics I",
            Number: "98",
            Type: "P",
            Group: "31",
            Day: "Thu",
            TimePeriod: "  9:00 AM - 12:00 PM",
            WeekNumber: "4,10",
            Room: "KB731"
        }, {
            Uid: 102,
            SubjectCode: "UEME1112",
            SubjectName: "Engineering Thermodynamics I",
            Number: "99",
            Type: "P",
            Group: "32",
            Day: "Thu",
            TimePeriod: "  9:00 AM - 12:00 PM",
            WeekNumber: "6,12",
            Room: "KB731"
        }, {
            Uid: 103,
            SubjectCode: "UEME1112",
            SubjectName: "Engineering Thermodynamics I",
            Number: "100",
            Type: "T",
            Group: "2",
            Day: "Mon",
            TimePeriod: "  1:00 PM -  2:00 PM",
            WeekNumber: "2,4,6,8,10,12",
            Room: "KB521"
        }, {
            Uid: 104,
            SubjectCode: "UEME1112",
            SubjectName: "Engineering Thermodynamics I",
            Number: "101",
            Type: "T",
            Group: "5",
            Day: "Wed",
            TimePeriod: " 11:00 AM - 12:00 PM",
            WeekNumber: "3,5,7,9,11,13",
            Room: "KB521"
        }, {
            Uid: 105,
            SubjectCode: "UEME1112",
            SubjectName: "Engineering Thermodynamics I",
            Number: "102",
            Type: "T",
            Group: "6",
            Day: "Wed",
            TimePeriod: " 11:00 AM - 12:00 PM",
            WeekNumber: "2,4,6,8,10,12",
            Room: "KB521"
        }, {
            Uid: 106,
            SubjectCode: "UEME1112",
            SubjectName: "Engineering Thermodynamics I",
            Number: "103",
            Type: "T",
            Group: "7",
            Day: "Wed",
            TimePeriod: "  2:00 PM -  3:00 PM",
            WeekNumber: "3,5,7,9,11,13",
            Room: "KB524"
        }, {
            Uid: 107,
            SubjectCode: "UEME1112",
            SubjectName: "Engineering Thermodynamics I",
            Number: "104",
            Type: "T",
            Group: "9",
            Day: "Wed",
            TimePeriod: "  4:00 PM -  5:00 PM",
            WeekNumber: "3,5,7,9,11,13",
            Room: "KB322"
        }, {
            Uid: 108,
            SubjectCode: "UEME1112",
            SubjectName: "Engineering Thermodynamics I",
            Number: "105",
            Type: "T",
            Group: "10",
            Day: "Wed",
            TimePeriod: "  4:00 PM -  5:00 PM",
            WeekNumber: "2,4,6,8,10,12",
            Room: "KB322"
        }, {
            Uid: 109,
            SubjectCode: "UEME1112",
            SubjectName: "Engineering Thermodynamics I",
            Number: "106",
            Type: "T",
            Group: "11",
            Day: "Wed",
            TimePeriod: "  5:00 PM -  6:00 PM",
            WeekNumber: "3,5,7,9,11,13",
            Room: "KB322"
        }, {
            Uid: 110,
            SubjectCode: "UEME1112",
            SubjectName: "Engineering Thermodynamics I",
            Number: "107",
            Type: "T",
            Group: "12",
            Day: "Wed",
            TimePeriod: "  5:00 PM -  6:00 PM",
            WeekNumber: "2,4,6,8,10,12",
            Room: "KB322"
        }, {
            Uid: 111,
            SubjectCode: "UEME1112",
            SubjectName: "Engineering Thermodynamics I",
            Number: "108",
            Type: "T",
            Group: "15",
            Day: "Thu",
            TimePeriod: "  9:00 AM - 10:00 AM",
            WeekNumber: "3,5,7,9,11,13",
            Room: "KB210"
        }, {
            Uid: 112,
            SubjectCode: "UEME1112",
            SubjectName: "Engineering Thermodynamics I",
            Number: "109",
            Type: "T",
            Group: "16",
            Day: "Thu",
            TimePeriod: "  9:00 AM - 10:00 AM",
            WeekNumber: "2,4,6,8,10,12",
            Room: "KB210"
        }, {
            Uid: 113,
            SubjectCode: "UEME1112",
            SubjectName: "Engineering Thermodynamics I",
            Number: "110",
            Type: "T",
            Group: "21",
            Day: "Fri",
            TimePeriod: "  9:00 AM - 10:00 AM",
            WeekNumber: "3,5,7,9,11,13",
            Room: "KB324"
        }, {
            Uid: 114,
            SubjectCode: "UEME1112",
            SubjectName: "Engineering Thermodynamics I",
            Number: "111",
            Type: "T",
            Group: "22",
            Day: "Fri",
            TimePeriod: "  9:00 AM - 10:00 AM",
            WeekNumber: "2,4,6,8,10,12",
            Room: "KB324"
        }, {
            Uid: 115,
            SubjectCode: "UEME1132",
            SubjectName: "Statics",
            Number: "112",
            Type: "L",
            Group: "1",
            Day: "Mon",
            TimePeriod: " 12:00 PM -  2:00 PM",
            WeekNumber: "1-14",
            Room: "KB209"
        }, {
            Uid: 116,
            SubjectCode: "UEME1132",
            SubjectName: "Statics",
            Number: "113",
            Type: "L",
            Group: "3",
            Day: "Wed",
            TimePeriod: "  9:00 AM - 11:00 AM",
            WeekNumber: "1-14",
            Room: "KB208"
        }, {
            Uid: 117,
            SubjectCode: "UEME1132",
            SubjectName: "Statics",
            Number: "114",
            Type: "L",
            Group: "4",
            Day: "Fri",
            TimePeriod: "  4:30 PM -  6:30 PM",
            WeekNumber: "1-14",
            Room: "KB520"
        }, {
            Uid: 118,
            SubjectCode: "UEME1132",
            SubjectName: "Statics",
            Number: "115",
            Type: "P",
            Group: "6",
            Day: "Tue",
            TimePeriod: " 11:30 AM -  2:30 PM",
            WeekNumber: "2,8",
            Room: "KB730"
        }, {
            Uid: 119,
            SubjectCode: "UEME1132",
            SubjectName: "Statics",
            Number: "116",
            Type: "P",
            Group: "7",
            Day: "Tue",
            TimePeriod: " 11:30 AM -  2:30 PM",
            WeekNumber: "3,9",
            Room: "KB730"
        }, {
            Uid: 120,
            SubjectCode: "UEME1132",
            SubjectName: "Statics",
            Number: "117",
            Type: "P",
            Group: "8",
            Day: "Tue",
            TimePeriod: " 11:30 AM -  2:30 PM",
            WeekNumber: "4,10",
            Room: "KB730"
        }, {
            Uid: 121,
            SubjectCode: "UEME1132",
            SubjectName: "Statics",
            Number: "118",
            Type: "P",
            Group: "10",
            Day: "Tue",
            TimePeriod: " 11:30 AM -  2:30 PM",
            WeekNumber: "7,11",
            Room: "KB730"
        }, {
            Uid: 122,
            SubjectCode: "UEME1132",
            SubjectName: "Statics",
            Number: "119",
            Type: "P",
            Group: "15",
            Day: "Tue",
            TimePeriod: "  2:30 PM -  5:30 PM",
            WeekNumber: "7,11",
            Room: "KB730"
        }, {
            Uid: 123,
            SubjectCode: "UEME1132",
            SubjectName: "Statics",
            Number: "120",
            Type: "P",
            Group: "16",
            Day: "Wed",
            TimePeriod: "  8:30 AM - 11:30 AM",
            WeekNumber: "2,8",
            Room: "KB730"
        }, {
            Uid: 124,
            SubjectCode: "UEME1132",
            SubjectName: "Statics",
            Number: "121",
            Type: "P",
            Group: "17",
            Day: "Wed",
            TimePeriod: "  8:30 AM - 11:30 AM",
            WeekNumber: "3,9",
            Room: "KB730"
        }, {
            Uid: 125,
            SubjectCode: "UEME1132",
            SubjectName: "Statics",
            Number: "122",
            Type: "P",
            Group: "18",
            Day: "Wed",
            TimePeriod: "  8:30 AM - 11:30 AM",
            WeekNumber: "4,10",
            Room: "KB730"
        }, {
            Uid: 126,
            SubjectCode: "UEME1132",
            SubjectName: "Statics",
            Number: "123",
            Type: "P",
            Group: "21",
            Day: "Wed",
            TimePeriod: " 11:30 AM -  2:30 PM",
            WeekNumber: "2,8",
            Room: "KB730"
        }, {
            Uid: 127,
            SubjectCode: "UEME1132",
            SubjectName: "Statics",
            Number: "124",
            Type: "P",
            Group: "22",
            Day: "Wed",
            TimePeriod: " 11:30 AM -  2:30 PM",
            WeekNumber: "3,9",
            Room: "KB730"
        }, {
            Uid: 128,
            SubjectCode: "UEME1132",
            SubjectName: "Statics",
            Number: "125",
            Type: "P",
            Group: "23",
            Day: "Wed",
            TimePeriod: " 11:30 AM -  2:30 PM",
            WeekNumber: "4,10",
            Room: "KB730"
        }, {
            Uid: 129,
            SubjectCode: "UEME1132",
            SubjectName: "Statics",
            Number: "126",
            Type: "P",
            Group: "25",
            Day: "Wed",
            TimePeriod: " 11:30 AM -  2:30 PM",
            WeekNumber: "7,11",
            Room: "KB730"
        }, {
            Uid: 130,
            SubjectCode: "UEME1132",
            SubjectName: "Statics",
            Number: "127",
            Type: "P",
            Group: "31",
            Day: "Thu",
            TimePeriod: "  8:30 AM - 11:30 AM",
            WeekNumber: "2,8",
            Room: "KB730"
        }, {
            Uid: 131,
            SubjectCode: "UEME1132",
            SubjectName: "Statics",
            Number: "128",
            Type: "T",
            Group: "5",
            Day: "Mon",
            TimePeriod: " 11:00 AM - 12:00 PM",
            WeekNumber: "3,5,7,9,11,13",
            Room: "KB320"
        }, {
            Uid: 132,
            SubjectCode: "UEME1132",
            SubjectName: "Statics",
            Number: "129",
            Type: "T",
            Group: "6",
            Day: "Mon",
            TimePeriod: " 11:00 AM - 12:00 PM",
            WeekNumber: "2,4,6,8,10,12",
            Room: "KB320"
        }, {
            Uid: 133,
            SubjectCode: "UEME1132",
            SubjectName: "Statics",
            Number: "130",
            Type: "T",
            Group: "15",
            Day: "Wed",
            TimePeriod: "  2:00 PM -  3:00 PM",
            WeekNumber: "3,5,7,9,11,13",
            Room: "KB516"
        }, {
            Uid: 134,
            SubjectCode: "UEME1132",
            SubjectName: "Statics",
            Number: "131",
            Type: "T",
            Group: "16",
            Day: "Wed",
            TimePeriod: "  2:00 PM -  3:00 PM",
            WeekNumber: "2,4,6,8,10,12",
            Room: "KB516"
        }, {
            Uid: 135,
            SubjectCode: "UEME1132",
            SubjectName: "Statics",
            Number: "132",
            Type: "T",
            Group: "17",
            Day: "Thu",
            TimePeriod: "  2:00 PM -  3:00 PM",
            WeekNumber: "3,5,7,9,11,13",
            Room: "KB326"
        }, {
            Uid: 136,
            SubjectCode: "UEME1132",
            SubjectName: "Statics",
            Number: "133",
            Type: "T",
            Group: "18",
            Day: "Thu",
            TimePeriod: "  2:00 PM -  3:00 PM",
            WeekNumber: "2,4,6,8,10,12",
            Room: "KB326"
        }, {
            Uid: 137,
            SubjectCode: "UEME1132",
            SubjectName: "Statics",
            Number: "134",
            Type: "T",
            Group: "22",
            Day: "Fri",
            TimePeriod: "  3:30 PM -  4:30 PM",
            WeekNumber: "2,4,6,8,10,12",
            Room: "KB320"
        }, {
            Uid: 138,
            SubjectCode: "UEME1132",
            SubjectName: "Statics",
            Number: "135",
            Type: "T",
            Group: "23",
            Day: "Fri",
            TimePeriod: "  4:30 PM -  5:30 PM",
            WeekNumber: "3,5,7,9,11,13",
            Room: "KB320"
        }, {
            Uid: 139,
            SubjectCode: "UEME1132",
            SubjectName: "Statics",
            Number: "136",
            Type: "T",
            Group: "24",
            Day: "Fri",
            TimePeriod: "  4:30 PM -  5:30 PM",
            WeekNumber: "2,4,6,8,10,12",
            Room: "KB320"
        }, {
            Uid: 140,
            SubjectCode: "UEME1252",
            SubjectName: "Engineering Drawing & Cad",
            Number: "137",
            Type: "L",
            Group: "1",
            Day: "Mon",
            TimePeriod: "  5:00 PM -  6:30 PM",
            WeekNumber: "1-14",
            Room: "KB208"
        }, {
            Uid: 141,
            SubjectCode: "UEME1252",
            SubjectName: "Engineering Drawing & Cad",
            Number: "138",
            Type: "L",
            Group: "2",
            Day: "Tue",
            TimePeriod: "  5:00 PM -  6:30 PM",
            WeekNumber: "1-14",
            Room: "KB207"
        }, {
            Uid: 142,
            SubjectCode: "UEME1252",
            SubjectName: "Engineering Drawing & Cad",
            Number: "139",
            Type: "L",
            Group: "3",
            Day: "Wed",
            TimePeriod: "  5:00 PM -  6:30 PM",
            WeekNumber: "1-14",
            Room: "KB213"
        }, {
            Uid: 143,
            SubjectCode: "UEME1252",
            SubjectName: "Engineering Drawing & Cad",
            Number: "140",
            Type: "P",
            Group: "3",
            Day: "Mon",
            TimePeriod: "  1:00 PM -  3:00 PM",
            WeekNumber: "1-2,4,6-14",
            Room: "KB609"
        }, {
            Uid: 144,
            SubjectCode: "UEME1252",
            SubjectName: "Engineering Drawing & Cad",
            Number: "141",
            Type: "P",
            Group: "4",
            Day: "Mon",
            TimePeriod: "  3:00 PM -  5:00 PM",
            WeekNumber: "1-2,4,6-14",
            Room: "KB609"
        }, {
            Uid: 145,
            SubjectCode: "UEME1252",
            SubjectName: "Engineering Drawing & Cad",
            Number: "142",
            Type: "P",
            Group: "5",
            Day: "Tue",
            TimePeriod: "  9:00 AM - 11:00 AM",
            WeekNumber: "1-4,6-14",
            Room: "KB609"
        }, {
            Uid: 146,
            SubjectCode: "UEME1252",
            SubjectName: "Engineering Drawing & Cad",
            Number: "143",
            Type: "P",
            Group: "6",
            Day: "Tue",
            TimePeriod: " 11:00 AM -  1:00 PM",
            WeekNumber: "1-4,6-14",
            Room: "KB609"
        }, {
            Uid: 147,
            SubjectCode: "UEME1252",
            SubjectName: "Engineering Drawing & Cad",
            Number: "144",
            Type: "P",
            Group: "7",
            Day: "Tue",
            TimePeriod: "  1:00 PM -  3:00 PM",
            WeekNumber: "1-4,6-14",
            Room: "KB609"
        }, {
            Uid: 148,
            SubjectCode: "UEME1252",
            SubjectName: "Engineering Drawing & Cad",
            Number: "145",
            Type: "P",
            Group: "8",
            Day: "Tue",
            TimePeriod: "  3:00 PM -  5:00 PM",
            WeekNumber: "1-4,6-14",
            Room: "KB609"
        }, {
            Uid: 149,
            SubjectCode: "UEME1252",
            SubjectName: "Engineering Drawing & Cad",
            Number: "146",
            Type: "P",
            Group: "10",
            Day: "Wed",
            TimePeriod: " 11:00 AM -  1:00 PM",
            WeekNumber: "1-4,6-14",
            Room: "KB606"
        }, {
            Uid: 150,
            SubjectCode: "UEME1252",
            SubjectName: "Engineering Drawing & Cad",
            Number: "147",
            Type: "P",
            Group: "17",
            Day: "Fri",
            TimePeriod: "  8:30 AM - 10:30 AM",
            WeekNumber: "1-4,6-14",
            Room: "KB609"
        }, {
            Uid: 151,
            SubjectCode: "UEME1252",
            SubjectName: "Engineering Drawing & Cad",
            Number: "148",
            Type: "P",
            Group: "18",
            Day: "Fri",
            TimePeriod: " 10:30 AM - 12:30 PM",
            WeekNumber: "1-4,6-14",
            Room: "KB609"
        }, {
            Uid: 152,
            SubjectCode: "UEME1252",
            SubjectName: "Engineering Drawing & Cad",
            Number: "149",
            Type: "P",
            Group: "20",
            Day: "Fri",
            TimePeriod: "  8:30 AM - 10:30 AM",
            WeekNumber: "1-4,6-14",
            Room: "KB606"
        }, {
            Uid: 153,
            SubjectCode: "UEME1252",
            SubjectName: "Engineering Drawing & Cad",
            Number: "150",
            Type: "P",
            Group: "21",
            Day: "Fri",
            TimePeriod: " 10:30 AM - 12:30 PM",
            WeekNumber: "1-4,6-14",
            Room: "KB606"
        }, {
            Uid: 154,
            SubjectCode: "UEME2123",
            SubjectName: "Fluid Mechanics I",
            Number: "151",
            Type: "L",
            Group: "1",
            Day: "Mon",
            TimePeriod: " 10:00 AM - 12:00 PM",
            WeekNumber: "1-14",
            Room: "KB209"
        }, {
            Uid: 155,
            SubjectCode: "UEME2123",
            SubjectName: "Fluid Mechanics I",
            Number: "151",
            Type: "L",
            Group: "1",
            Day: "Thu",
            TimePeriod: "  1:00 PM -  2:00 PM",
            WeekNumber: "1-14",
            Room: "KB207"
        }, {
            Uid: 156,
            SubjectCode: "UEME2123",
            SubjectName: "Fluid Mechanics I",
            Number: "152",
            Type: "L",
            Group: "2",
            Day: "Mon",
            TimePeriod: "  1:00 PM -  3:00 PM",
            WeekNumber: "1-14",
            Room: "KB207"
        }, {
            Uid: 157,
            SubjectCode: "UEME2123",
            SubjectName: "Fluid Mechanics I",
            Number: "152",
            Type: "L",
            Group: "2",
            Day: "Fri",
            TimePeriod: "  5:30 PM -  6:30 PM",
            WeekNumber: "1-14",
            Room: "KB209"
        }, {
            Uid: 158,
            SubjectCode: "UEME2123",
            SubjectName: "Fluid Mechanics I",
            Number: "153",
            Type: "L",
            Group: "3",
            Day: "Tue",
            TimePeriod: "  4:00 PM -  5:00 PM",
            WeekNumber: "1-14",
            Room: "KB208"
        }, {
            Uid: 159,
            SubjectCode: "UEME2123",
            SubjectName: "Fluid Mechanics I",
            Number: "153",
            Type: "L",
            Group: "3",
            Day: "Thu",
            TimePeriod: "  5:00 PM -  7:00 PM",
            WeekNumber: "1-14",
            Room: "KB209"
        }, {
            Uid: 160,
            SubjectCode: "UEME2123",
            SubjectName: "Fluid Mechanics I",
            Number: "154",
            Type: "P",
            Group: "1",
            Day: "Tue",
            TimePeriod: "  9:00 AM - 12:00 PM",
            WeekNumber: "2,8",
            Room: "KB731"
        }, {
            Uid: 161,
            SubjectCode: "UEME2123",
            SubjectName: "Fluid Mechanics I",
            Number: "155",
            Type: "P",
            Group: "2",
            Day: "Tue",
            TimePeriod: "  9:00 AM - 12:00 PM",
            WeekNumber: "3,9",
            Room: "KB731"
        }, {
            Uid: 162,
            SubjectCode: "UEME2123",
            SubjectName: "Fluid Mechanics I",
            Number: "156",
            Type: "P",
            Group: "3",
            Day: "Tue",
            TimePeriod: "  9:00 AM - 12:00 PM",
            WeekNumber: "4,10",
            Room: "KB731"
        }, {
            Uid: 163,
            SubjectCode: "UEME2123",
            SubjectName: "Fluid Mechanics I",
            Number: "157",
            Type: "P",
            Group: "4",
            Day: "Tue",
            TimePeriod: "  9:00 AM - 12:00 PM",
            WeekNumber: "6,12",
            Room: "KB731"
        }, {
            Uid: 164,
            SubjectCode: "UEME2123",
            SubjectName: "Fluid Mechanics I",
            Number: "158",
            Type: "P",
            Group: "5",
            Day: "Tue",
            TimePeriod: "  9:00 AM - 12:00 PM",
            WeekNumber: "7,11",
            Room: "KB731"
        }, {
            Uid: 165,
            SubjectCode: "UEME2123",
            SubjectName: "Fluid Mechanics I",
            Number: "159",
            Type: "P",
            Group: "6",
            Day: "Tue",
            TimePeriod: "  2:00 PM -  5:00 PM",
            WeekNumber: "2,8",
            Room: "KB731"
        }, {
            Uid: 166,
            SubjectCode: "UEME2123",
            SubjectName: "Fluid Mechanics I",
            Number: "160",
            Type: "P",
            Group: "7",
            Day: "Tue",
            TimePeriod: "  2:00 PM -  5:00 PM",
            WeekNumber: "3,9",
            Room: "KB731"
        }, {
            Uid: 167,
            SubjectCode: "UEME2123",
            SubjectName: "Fluid Mechanics I",
            Number: "161",
            Type: "P",
            Group: "8",
            Day: "Tue",
            TimePeriod: "  2:00 PM -  5:00 PM",
            WeekNumber: "4,10",
            Room: "KB731"
        }, {
            Uid: 168,
            SubjectCode: "UEME2123",
            SubjectName: "Fluid Mechanics I",
            Number: "162",
            Type: "P",
            Group: "10",
            Day: "Tue",
            TimePeriod: "  2:00 PM -  5:00 PM",
            WeekNumber: "7,11",
            Room: "KB731"
        }, {
            Uid: 169,
            SubjectCode: "UEME2123",
            SubjectName: "Fluid Mechanics I",
            Number: "163",
            Type: "P",
            Group: "16",
            Day: "Wed",
            TimePeriod: "  2:00 PM -  5:00 PM",
            WeekNumber: "2,8",
            Room: "KB731"
        }, {
            Uid: 170,
            SubjectCode: "UEME2123",
            SubjectName: "Fluid Mechanics I",
            Number: "164",
            Type: "P",
            Group: "17",
            Day: "Wed",
            TimePeriod: "  2:00 PM -  5:00 PM",
            WeekNumber: "3,9",
            Room: "KB731"
        }, {
            Uid: 171,
            SubjectCode: "UEME2123",
            SubjectName: "Fluid Mechanics I",
            Number: "165",
            Type: "P",
            Group: "18",
            Day: "Wed",
            TimePeriod: "  2:00 PM -  5:00 PM",
            WeekNumber: "4,10",
            Room: "KB731"
        }, {
            Uid: 172,
            SubjectCode: "UEME2123",
            SubjectName: "Fluid Mechanics I",
            Number: "166",
            Type: "P",
            Group: "19",
            Day: "Wed",
            TimePeriod: "  2:00 PM -  5:00 PM",
            WeekNumber: "6,12",
            Room: "KB731"
        }, {
            Uid: 173,
            SubjectCode: "UEME2123",
            SubjectName: "Fluid Mechanics I",
            Number: "167",
            Type: "P",
            Group: "20",
            Day: "Wed",
            TimePeriod: "  2:00 PM -  5:00 PM",
            WeekNumber: "7,11",
            Room: "KB731"
        }, {
            Uid: 174,
            SubjectCode: "UEME2123",
            SubjectName: "Fluid Mechanics I",
            Number: "168",
            Type: "P",
            Group: "21",
            Day: "Thu",
            TimePeriod: "  9:00 AM - 12:00 PM",
            WeekNumber: "2,8",
            Room: "KB731"
        }, {
            Uid: 175,
            SubjectCode: "UEME2123",
            SubjectName: "Fluid Mechanics I",
            Number: "169",
            Type: "P",
            Group: "22",
            Day: "Thu",
            TimePeriod: "  9:00 AM - 12:00 PM",
            WeekNumber: "3,9",
            Room: "KB731"
        }, {
            Uid: 176,
            SubjectCode: "UEME2123",
            SubjectName: "Fluid Mechanics I",
            Number: "170",
            Type: "P",
            Group: "23",
            Day: "Thu",
            TimePeriod: "  9:00 AM - 12:00 PM",
            WeekNumber: "4,10",
            Room: "KB731"
        }, {
            Uid: 177,
            SubjectCode: "UEME2123",
            SubjectName: "Fluid Mechanics I",
            Number: "171",
            Type: "P",
            Group: "24",
            Day: "Thu",
            TimePeriod: "  9:00 AM - 12:00 PM",
            WeekNumber: "6,12",
            Room: "KB731"
        }, {
            Uid: 178,
            SubjectCode: "UEME2123",
            SubjectName: "Fluid Mechanics I",
            Number: "172",
            Type: "P",
            Group: "25",
            Day: "Thu",
            TimePeriod: "  9:00 AM - 12:00 PM",
            WeekNumber: "7,11",
            Room: "KB731"
        }, {
            Uid: 179,
            SubjectCode: "UEME2123",
            SubjectName: "Fluid Mechanics I",
            Number: "173",
            Type: "P",
            Group: "26",
            Day: "Fri",
            TimePeriod: "  8:30 AM - 11:30 AM",
            WeekNumber: "2,8",
            Room: "KB731"
        }, {
            Uid: 180,
            SubjectCode: "UEME2123",
            SubjectName: "Fluid Mechanics I",
            Number: "174",
            Type: "P",
            Group: "27",
            Day: "Fri",
            TimePeriod: "  8:30 AM - 11:30 AM",
            WeekNumber: "3,9",
            Room: "KB731"
        }, {
            Uid: 181,
            SubjectCode: "UEME2123",
            SubjectName: "Fluid Mechanics I",
            Number: "175",
            Type: "P",
            Group: "28",
            Day: "Fri",
            TimePeriod: "  8:30 AM - 11:30 AM",
            WeekNumber: "4,10",
            Room: "KB731"
        }, {
            Uid: 182,
            SubjectCode: "UEME2123",
            SubjectName: "Fluid Mechanics I",
            Number: "176",
            Type: "P",
            Group: "29",
            Day: "Fri",
            TimePeriod: "  8:30 AM - 11:30 AM",
            WeekNumber: "6,12",
            Room: "KB731"
        }, {
            Uid: 183,
            SubjectCode: "UEME2123",
            SubjectName: "Fluid Mechanics I",
            Number: "177",
            Type: "P",
            Group: "30",
            Day: "Fri",
            TimePeriod: "  8:30 AM - 11:30 AM",
            WeekNumber: "7,11",
            Room: "KB731"
        }, {
            Uid: 184,
            SubjectCode: "UEME2123",
            SubjectName: "Fluid Mechanics I",
            Number: "178",
            Type: "T",
            Group: "3",
            Day: "Wed",
            TimePeriod: "  1:00 PM -  2:00 PM",
            WeekNumber: "3,5,7,9,11,13",
            Room: "KB316"
        }, {
            Uid: 185,
            SubjectCode: "UEME2123",
            SubjectName: "Fluid Mechanics I",
            Number: "179",
            Type: "T",
            Group: "4",
            Day: "Wed",
            TimePeriod: "  1:00 PM -  2:00 PM",
            WeekNumber: "2,4,6,8,10,12",
            Room: "KB316"
        }, {
            Uid: 186,
            SubjectCode: "UEME2123",
            SubjectName: "Fluid Mechanics I",
            Number: "180",
            Type: "T",
            Group: "5",
            Day: "Wed",
            TimePeriod: "  3:00 PM -  4:00 PM",
            WeekNumber: "3,5,7,9,11,13",
            Room: "KB301"
        }, {
            Uid: 187,
            SubjectCode: "UEME2123",
            SubjectName: "Fluid Mechanics I",
            Number: "181",
            Type: "T",
            Group: "6",
            Day: "Wed",
            TimePeriod: "  3:00 PM -  4:00 PM",
            WeekNumber: "2,4,6,8,10,12",
            Room: "KB301"
        }, {
            Uid: 188,
            SubjectCode: "UEME2123",
            SubjectName: "Fluid Mechanics I",
            Number: "182",
            Type: "T",
            Group: "9",
            Day: "Wed",
            TimePeriod: "  5:00 PM -  6:00 PM",
            WeekNumber: "3,5,7,9,11,13",
            Room: "KB301"
        }, {
            Uid: 189,
            SubjectCode: "UEME2123",
            SubjectName: "Fluid Mechanics I",
            Number: "183",
            Type: "T",
            Group: "10",
            Day: "Wed",
            TimePeriod: "  5:00 PM -  6:00 PM",
            WeekNumber: "2,4,6,8,10,12",
            Room: "KB301"
        }, {
            Uid: 190,
            SubjectCode: "UEME2123",
            SubjectName: "Fluid Mechanics I",
            Number: "184",
            Type: "T",
            Group: "11",
            Day: "Thu",
            TimePeriod: " 12:00 PM -  1:00 PM",
            WeekNumber: "3,5,7,9,11,13",
            Room: "KB210"
        }, {
            Uid: 191,
            SubjectCode: "UEME2123",
            SubjectName: "Fluid Mechanics I",
            Number: "185",
            Type: "T",
            Group: "12",
            Day: "Thu",
            TimePeriod: " 12:00 PM -  1:00 PM",
            WeekNumber: "2,4,6,8,10,12",
            Room: "KB210"
        }, {
            Uid: 192,
            SubjectCode: "UEME2123",
            SubjectName: "Fluid Mechanics I",
            Number: "186",
            Type: "T",
            Group: "13",
            Day: "Fri",
            TimePeriod: " 10:30 AM - 11:30 AM",
            WeekNumber: "3,5,7,9,11,13",
            Room: "KB314"
        }, {
            Uid: 193,
            SubjectCode: "UEME2123",
            SubjectName: "Fluid Mechanics I",
            Number: "187",
            Type: "T",
            Group: "14",
            Day: "Fri",
            TimePeriod: " 10:30 AM - 11:30 AM",
            WeekNumber: "2,4,6,8,10,12",
            Room: "KB314"
        }, {
            Uid: 194,
            SubjectCode: "UEME2123",
            SubjectName: "Fluid Mechanics I",
            Number: "188",
            Type: "T",
            Group: "15",
            Day: "Fri",
            TimePeriod: " 11:30 AM - 12:30 PM",
            WeekNumber: "3,5,7,9,11,13",
            Room: "KB314"
        }, {
            Uid: 195,
            SubjectCode: "UEME2123",
            SubjectName: "Fluid Mechanics I",
            Number: "189",
            Type: "T",
            Group: "16",
            Day: "Fri",
            TimePeriod: " 11:30 AM - 12:30 PM",
            WeekNumber: "2,4,6,8,10,12",
            Room: "KB314"
        }, {
            Uid: 196,
            SubjectCode: "UEME2123",
            SubjectName: "Fluid Mechanics I",
            Number: "190",
            Type: "T",
            Group: "17",
            Day: "Fri",
            TimePeriod: "  2:30 PM -  3:30 PM",
            WeekNumber: "3,5,7,9,11,13",
            Room: "KB326"
        }, {
            Uid: 197,
            SubjectCode: "UEME2123",
            SubjectName: "Fluid Mechanics I",
            Number: "191",
            Type: "T",
            Group: "18",
            Day: "Fri",
            TimePeriod: "  2:30 PM -  3:30 PM",
            WeekNumber: "2,4,6,8,10,12",
            Room: "KB326"
        }, {
            Uid: 198,
            SubjectCode: "UEME2123",
            SubjectName: "Fluid Mechanics I",
            Number: "192",
            Type: "T",
            Group: "19",
            Day: "Fri",
            TimePeriod: "  4:30 PM -  5:30 PM",
            WeekNumber: "3,5,7,9,11,13",
            Room: "KB518"
        }, {
            Uid: 199,
            SubjectCode: "UEME2123",
            SubjectName: "Fluid Mechanics I",
            Number: "193",
            Type: "T",
            Group: "20",
            Day: "Fri",
            TimePeriod: "  4:30 PM -  5:30 PM",
            WeekNumber: "2,4,6,8,10,12",
            Room: "KB518"
        }, {
            Uid: 200,
            SubjectCode: "UEME3112",
            SubjectName: "Fluid Mechanics II",
            Number: "194",
            Type: "L",
            Group: "1",
            Day: "Wed",
            TimePeriod: "  2:00 PM -  4:00 PM",
            WeekNumber: "1-14",
            Room: "KB209"
        }, {
            Uid: 201,
            SubjectCode: "UEME3112",
            SubjectName: "Fluid Mechanics II",
            Number: "195",
            Type: "L",
            Group: "2",
            Day: "Thu",
            TimePeriod: "  3:00 PM -  5:00 PM",
            WeekNumber: "1-14",
            Room: "KB207"
        }, {
            Uid: 202,
            SubjectCode: "UEME3112",
            SubjectName: "Fluid Mechanics II",
            Number: "196",
            Type: "P",
            Group: "1",
            Day: "Mon",
            TimePeriod: "  9:00 AM - 12:00 PM",
            WeekNumber: "2,8",
            Room: "KB731"
        }, {
            Uid: 203,
            SubjectCode: "UEME3112",
            SubjectName: "Fluid Mechanics II",
            Number: "197",
            Type: "P",
            Group: "2",
            Day: "Mon",
            TimePeriod: "  9:00 AM - 12:00 PM",
            WeekNumber: "4,10",
            Room: "KB731"
        }, {
            Uid: 204,
            SubjectCode: "UEME3112",
            SubjectName: "Fluid Mechanics II",
            Number: "198",
            Type: "P",
            Group: "3",
            Day: "Mon",
            TimePeriod: "  9:00 AM - 12:00 PM",
            WeekNumber: "6,12",
            Room: "KB731"
        }, {
            Uid: 205,
            SubjectCode: "UEME3112",
            SubjectName: "Fluid Mechanics II",
            Number: "199",
            Type: "P",
            Group: "4",
            Day: "Mon",
            TimePeriod: "  9:00 AM - 12:00 PM",
            WeekNumber: "7,11",
            Room: "KB731"
        }, {
            Uid: 206,
            SubjectCode: "UEME3112",
            SubjectName: "Fluid Mechanics II",
            Number: "200",
            Type: "P",
            Group: "5",
            Day: "Mon",
            TimePeriod: "  2:00 PM -  5:00 PM",
            WeekNumber: "2,8",
            Room: "KB731"
        }, {
            Uid: 207,
            SubjectCode: "UEME3112",
            SubjectName: "Fluid Mechanics II",
            Number: "201",
            Type: "P",
            Group: "6",
            Day: "Mon",
            TimePeriod: "  2:00 PM -  5:00 PM",
            WeekNumber: "4,10",
            Room: "KB731"
        }, {
            Uid: 208,
            SubjectCode: "UEME3112",
            SubjectName: "Fluid Mechanics II",
            Number: "202",
            Type: "P",
            Group: "7",
            Day: "Mon",
            TimePeriod: "  2:00 PM -  5:00 PM",
            WeekNumber: "7,11",
            Room: "KB731"
        }, {
            Uid: 209,
            SubjectCode: "UEME3112",
            SubjectName: "Fluid Mechanics II",
            Number: "203",
            Type: "P",
            Group: "8",
            Day: "Thu",
            TimePeriod: "  2:00 PM -  5:00 PM",
            WeekNumber: "2,8",
            Room: "KB731"
        }, {
            Uid: 210,
            SubjectCode: "UEME3112",
            SubjectName: "Fluid Mechanics II",
            Number: "204",
            Type: "P",
            Group: "9",
            Day: "Thu",
            TimePeriod: "  2:00 PM -  5:00 PM",
            WeekNumber: "4,10",
            Room: "KB731"
        }, {
            Uid: 211,
            SubjectCode: "UEME3112",
            SubjectName: "Fluid Mechanics II",
            Number: "205",
            Type: "P",
            Group: "10",
            Day: "Fri",
            TimePeriod: "  8:30 AM - 11:30 AM",
            WeekNumber: "2,8",
            Room: "KB731"
        }, {
            Uid: 212,
            SubjectCode: "UEME3112",
            SubjectName: "Fluid Mechanics II",
            Number: "206",
            Type: "P",
            Group: "11",
            Day: "Fri",
            TimePeriod: "  8:30 AM - 11:30 AM",
            WeekNumber: "3,9",
            Room: "KB731"
        }, {
            Uid: 213,
            SubjectCode: "UEME3112",
            SubjectName: "Fluid Mechanics II",
            Number: "207",
            Type: "P",
            Group: "12",
            Day: "Fri",
            TimePeriod: "  8:30 AM - 11:30 AM",
            WeekNumber: "4,10",
            Room: "KB731"
        }, {
            Uid: 214,
            SubjectCode: "UEME3112",
            SubjectName: "Fluid Mechanics II",
            Number: "208",
            Type: "P",
            Group: "13",
            Day: "Fri",
            TimePeriod: "  8:30 AM - 11:30 AM",
            WeekNumber: "6,12",
            Room: "KB731"
        }, {
            Uid: 215,
            SubjectCode: "UEME3112",
            SubjectName: "Fluid Mechanics II",
            Number: "209",
            Type: "P",
            Group: "14",
            Day: "Fri",
            TimePeriod: "  2:30 PM -  5:30 PM",
            WeekNumber: "2,8",
            Room: "KB731"
        }, {
            Uid: 216,
            SubjectCode: "UEME3112",
            SubjectName: "Fluid Mechanics II",
            Number: "210",
            Type: "P",
            Group: "16",
            Day: "Fri",
            TimePeriod: "  2:30 PM -  5:30 PM",
            WeekNumber: "4,10",
            Room: "KB731"
        }, {
            Uid: 217,
            SubjectCode: "UEME3112",
            SubjectName: "Fluid Mechanics II",
            Number: "211",
            Type: "T",
            Group: "1",
            Day: "Mon",
            TimePeriod: "  8:00 AM -  9:00 AM",
            WeekNumber: "3,5,7,9,11,13",
            Room: "KB320"
        }, {
            Uid: 218,
            SubjectCode: "UEME3112",
            SubjectName: "Fluid Mechanics II",
            Number: "212",
            Type: "T",
            Group: "2",
            Day: "Mon",
            TimePeriod: "  8:00 AM -  9:00 AM",
            WeekNumber: "2,4,6,8,10,12",
            Room: "KB320"
        }, {
            Uid: 219,
            SubjectCode: "UEME3112",
            SubjectName: "Fluid Mechanics II",
            Number: "213",
            Type: "T",
            Group: "3",
            Day: "Mon",
            TimePeriod: " 10:00 AM - 11:00 AM",
            WeekNumber: "3,5,7,9,11,13",
            Room: "KB320"
        }, {
            Uid: 220,
            SubjectCode: "UEME3112",
            SubjectName: "Fluid Mechanics II",
            Number: "214",
            Type: "T",
            Group: "4",
            Day: "Mon",
            TimePeriod: " 10:00 AM - 11:00 AM",
            WeekNumber: "2,4,6,8,10,12",
            Room: "KB320"
        }, {
            Uid: 221,
            SubjectCode: "UEME3112",
            SubjectName: "Fluid Mechanics II",
            Number: "215",
            Type: "T",
            Group: "5",
            Day: "Mon",
            TimePeriod: "  1:00 PM -  2:00 PM",
            WeekNumber: "3,5,7,9,11,13",
            Room: "KB517"
        }, {
            Uid: 222,
            SubjectCode: "UEME3112",
            SubjectName: "Fluid Mechanics II",
            Number: "216",
            Type: "T",
            Group: "6",
            Day: "Mon",
            TimePeriod: "  1:00 PM -  2:00 PM",
            WeekNumber: "2,4,6,8,10,12",
            Room: "KB517"
        }, {
            Uid: 223,
            SubjectCode: "UEME3112",
            SubjectName: "Fluid Mechanics II",
            Number: "217",
            Type: "T",
            Group: "7",
            Day: "Wed",
            TimePeriod: " 11:00 AM - 12:00 PM",
            WeekNumber: "3,5,7,9,11,13",
            Room: "KB210"
        }, {
            Uid: 224,
            SubjectCode: "UEME3112",
            SubjectName: "Fluid Mechanics II",
            Number: "218",
            Type: "T",
            Group: "8",
            Day: "Wed",
            TimePeriod: " 11:00 AM - 12:00 PM",
            WeekNumber: "2,4,6,8,10,12",
            Room: "KB210"
        }, {
            Uid: 225,
            SubjectCode: "UEME3112",
            SubjectName: "Fluid Mechanics II",
            Number: "219",
            Type: "T",
            Group: "9",
            Day: "Wed",
            TimePeriod: " 12:00 PM -  1:00 PM",
            WeekNumber: "3,5,7,9,11,13",
            Room: "KB210"
        }, {
            Uid: 226,
            SubjectCode: "UEME3112",
            SubjectName: "Fluid Mechanics II",
            Number: "220",
            Type: "T",
            Group: "10",
            Day: "Wed",
            TimePeriod: " 12:00 PM -  1:00 PM",
            WeekNumber: "2,4,6,8,10,12",
            Room: "KB210"
        }, {
            Uid: 227,
            SubjectCode: "UEME3112",
            SubjectName: "Fluid Mechanics II",
            Number: "221",
            Type: "T",
            Group: "11",
            Day: "Fri",
            TimePeriod: "  8:30 AM -  9:30 AM",
            WeekNumber: "3,5,7,9,11,13",
            Room: "KB210"
        }, {
            Uid: 228,
            SubjectCode: "UEME3112",
            SubjectName: "Fluid Mechanics II",
            Number: "222",
            Type: "T",
            Group: "12",
            Day: "Fri",
            TimePeriod: "  8:30 AM -  9:30 AM",
            WeekNumber: "2,4,6,8,10,12",
            Room: "KB210"
        }, {
            Uid: 229,
            SubjectCode: "UEME3112",
            SubjectName: "Fluid Mechanics II",
            Number: "223",
            Type: "T",
            Group: "13",
            Day: "Fri",
            TimePeriod: "  9:30 AM - 10:30 AM",
            WeekNumber: "3,5,7,9,11,13",
            Room: "KB210"
        }, {
            Uid: 230,
            SubjectCode: "UEME3112",
            SubjectName: "Fluid Mechanics II",
            Number: "224",
            Type: "T",
            Group: "14",
            Day: "Fri",
            TimePeriod: "  9:30 AM - 10:30 AM",
            WeekNumber: "2,4,6,8,10,12",
            Room: "KB210"
        }, {
            Uid: 231,
            SubjectCode: "UEME3112",
            SubjectName: "Fluid Mechanics II",
            Number: "225",
            Type: "T",
            Group: "15",
            Day: "Fri",
            TimePeriod: "  3:30 PM -  4:30 PM",
            WeekNumber: "3,5,7,9,11,13",
            Room: "KB211"
        }, {
            Uid: 232,
            SubjectCode: "UEME3112",
            SubjectName: "Fluid Mechanics II",
            Number: "226",
            Type: "T",
            Group: "16",
            Day: "Fri",
            TimePeriod: "  3:30 PM -  4:30 PM",
            WeekNumber: "2,4,6,8,10,12",
            Room: "KB211"
        }, {
            Uid: 233,
            SubjectCode: "UEMX1133",
            SubjectName: "Introduction To Building Services",
            Number: "227",
            Type: "L",
            Group: "1",
            Day: "Tue",
            TimePeriod: " 12:00 PM -  2:00 PM",
            WeekNumber: "1-14",
            Room: "KB207"
        }, {
            Uid: 234,
            SubjectCode: "UEMX1133",
            SubjectName: "Introduction To Building Services",
            Number: "227",
            Type: "L",
            Group: "1",
            Day: "Thu",
            TimePeriod: "  1:00 PM -  2:00 PM",
            WeekNumber: "1-14",
            Room: "KB209"
        }, {
            Uid: 235,
            SubjectCode: "UEMX1133",
            SubjectName: "Introduction To Building Services",
            Number: "228",
            Type: "T",
            Group: "1",
            Day: "Fri",
            TimePeriod: "  9:30 AM - 10:30 AM",
            WeekNumber: "3,5,7,9,11,13",
            Room: "KB517"
        }, {
            Uid: 236,
            SubjectCode: "UEMX1133",
            SubjectName: "Introduction To Building Services",
            Number: "229",
            Type: "T",
            Group: "2",
            Day: "Fri",
            TimePeriod: "  9:30 AM - 10:30 AM",
            WeekNumber: "2,4,6,8,10,12",
            Room: "KB517"
        }, {
            Uid: 237,
            SubjectCode: "UEMX1133",
            SubjectName: "Introduction To Building Services",
            Number: "230",
            Type: "T",
            Group: "3",
            Day: "Fri",
            TimePeriod: " 10:30 AM - 11:30 AM",
            WeekNumber: "3,5,7,9,11,13",
            Room: "KB517"
        }, {
            Uid: 238,
            SubjectCode: "UEMX1133",
            SubjectName: "Introduction To Building Services",
            Number: "231",
            Type: "T",
            Group: "4",
            Day: "Fri",
            TimePeriod: " 10:30 AM - 11:30 AM",
            WeekNumber: "2,4,6,8,10,12",
            Room: "KB517"
        }, {
            Uid: 239,
            SubjectCode: "UEMX1133",
            SubjectName: "Introduction To Building Services",
            Number: "232",
            Type: "T",
            Group: "5",
            Day: "Fri",
            TimePeriod: "  2:30 PM -  3:30 PM",
            WeekNumber: "3,5,7,9,11,13",
            Room: "KB211"
        }, {
            Uid: 240,
            SubjectCode: "UEMX1133",
            SubjectName: "Introduction To Building Services",
            Number: "233",
            Type: "T",
            Group: "6",
            Day: "Fri",
            TimePeriod: "  2:30 PM -  3:30 PM",
            WeekNumber: "2,4,6,8,10,12",
            Room: "KB211"
        }, {
            Uid: 241,
            SubjectCode: "UEMX1843",
            SubjectName: "Survey I",
            Number: "234",
            Type: "L",
            Group: "1",
            Day: "Tue",
            TimePeriod: "  5:00 PM -  6:00 PM",
            WeekNumber: "1-14",
            Room: "KB209"
        }, {
            Uid: 242,
            SubjectCode: "UEMX1843",
            SubjectName: "Survey I",
            Number: "234",
            Type: "L",
            Group: "1",
            Day: "Thu",
            TimePeriod: " 11:00 AM -  1:00 PM",
            WeekNumber: "1-14",
            Room: "KB209"
        }, {
            Uid: 243,
            SubjectCode: "UEMX1843",
            SubjectName: "Survey I",
            Number: "235",
            Type: "P",
            Group: "4",
            Day: "Fri",
            TimePeriod: "  8:30 AM - 12:30 PM",
            WeekNumber: "2,4,6,8,10,12",
            Room: "KBS01"
        }, {
            Uid: 244,
            SubjectCode: "UEMX1843",
            SubjectName: "Survey I",
            Number: "236",
            Type: "P",
            Group: "5",
            Day: "Fri",
            TimePeriod: "  8:30 AM - 12:30 PM",
            WeekNumber: "1,3,7,9,11,13",
            Room: "KBS01"
        }, {
            Uid: 245,
            SubjectCode: "UEMX1843",
            SubjectName: "Survey I",
            Number: "237",
            Type: "T",
            Group: "1",
            Day: "Thu",
            TimePeriod: "  9:00 AM - 10:00 AM",
            WeekNumber: "3,5,7,9,11,13",
            Room: "KB516"
        }, {
            Uid: 246,
            SubjectCode: "UEMX1843",
            SubjectName: "Survey I",
            Number: "238",
            Type: "T",
            Group: "2",
            Day: "Thu",
            TimePeriod: "  9:00 AM - 10:00 AM",
            WeekNumber: "2,4,6,8,10,12",
            Room: "KB516"
        }, {
            Uid: 247,
            SubjectCode: "UEMX2323",
            SubjectName: "Structural Analysis II",
            Number: "239",
            Type: "L",
            Group: "1",
            Day: "Tue",
            TimePeriod: " 10:00 AM - 11:00 AM",
            WeekNumber: "1-14",
            Room: "KB209"
        }, {
            Uid: 248,
            SubjectCode: "UEMX2323",
            SubjectName: "Structural Analysis II",
            Number: "239",
            Type: "L",
            Group: "1",
            Day: "Wed",
            TimePeriod: "  2:00 PM -  4:00 PM",
            WeekNumber: "1-14",
            Room: "KB208"
        }, {
            Uid: 249,
            SubjectCode: "UEMX2323",
            SubjectName: "Structural Analysis II",
            Number: "240",
            Type: "T",
            Group: "1",
            Day: "Tue",
            TimePeriod: "  8:00 AM -  9:00 AM",
            WeekNumber: "3,5,7,9,11,13",
            Room: "KB318"
        }, {
            Uid: 250,
            SubjectCode: "UEMX2323",
            SubjectName: "Structural Analysis II",
            Number: "241",
            Type: "T",
            Group: "2",
            Day: "Tue",
            TimePeriod: "  8:00 AM -  9:00 AM",
            WeekNumber: "2,4,6,8,10,12",
            Room: "KB318"
        }, {
            Uid: 251,
            SubjectCode: "UEMX2323",
            SubjectName: "Structural Analysis II",
            Number: "242",
            Type: "T",
            Group: "3",
            Day: "Tue",
            TimePeriod: "  9:00 AM - 10:00 AM",
            WeekNumber: "3,5,7,9,11,13",
            Room: "KB318"
        }, {
            Uid: 252,
            SubjectCode: "UEMX2323",
            SubjectName: "Structural Analysis II",
            Number: "243",
            Type: "T",
            Group: "4",
            Day: "Tue",
            TimePeriod: "  9:00 AM - 10:00 AM",
            WeekNumber: "2,4,6,8,10,12",
            Room: "KB318"
        }, {
            Uid: 253,
            SubjectCode: "UEMX2323",
            SubjectName: "Structural Analysis II",
            Number: "244",
            Type: "T",
            Group: "5",
            Day: "Fri",
            TimePeriod: "  2:30 PM -  3:30 PM",
            WeekNumber: "3,5,7,9,11,13",
            Room: "KB324"
        }, {
            Uid: 254,
            SubjectCode: "UEMX2323",
            SubjectName: "Structural Analysis II",
            Number: "245",
            Type: "T",
            Group: "6",
            Day: "Fri",
            TimePeriod: "  2:30 PM -  3:30 PM",
            WeekNumber: "2,4,6,8,10,12",
            Room: "KB324"
        }, {
            Uid: 255,
            SubjectCode: "UEMX2363",
            SubjectName: "Concrete Structures Design II",
            Number: "246",
            Type: "L",
            Group: "1",
            Day: "Tue",
            TimePeriod: "  8:00 AM - 10:00 AM",
            WeekNumber: "2-14",
            Room: "KB209"
        }, {
            Uid: 256,
            SubjectCode: "UEMX2363",
            SubjectName: "Concrete Structures Design II",
            Number: "246",
            Type: "L",
            Group: "1",
            Day: "Wed",
            TimePeriod: "  1:00 PM -  2:00 PM",
            WeekNumber: "2-14",
            Room: "KB207"
        }, {
            Uid: 257,
            SubjectCode: "UEMX2363",
            SubjectName: "Concrete Structures Design II",
            Number: "247",
            Type: "T",
            Group: "1",
            Day: "Tue",
            TimePeriod: " 11:00 AM - 12:00 PM",
            WeekNumber: "3,5,7,9,11,13",
            Room: "KB318"
        }, {
            Uid: 258,
            SubjectCode: "UEMX2363",
            SubjectName: "Concrete Structures Design II",
            Number: "248",
            Type: "T",
            Group: "2",
            Day: "Tue",
            TimePeriod: " 11:00 AM - 12:00 PM",
            WeekNumber: "2,4,6,8,10,12",
            Room: "KB318"
        }, {
            Uid: 259,
            SubjectCode: "UEMX2363",
            SubjectName: "Concrete Structures Design II",
            Number: "249",
            Type: "T",
            Group: "3",
            Day: "Thu",
            TimePeriod: "  9:00 AM - 10:00 AM",
            WeekNumber: "3,5,7,9,11,13",
            Room: "KB326"
        }, {
            Uid: 260,
            SubjectCode: "UEMX2363",
            SubjectName: "Concrete Structures Design II",
            Number: "250",
            Type: "T",
            Group: "4",
            Day: "Thu",
            TimePeriod: "  9:00 AM - 10:00 AM",
            WeekNumber: "2,4,6,8,10,12",
            Room: "KB326"
        }, {
            Uid: 261,
            SubjectCode: "UEMX2363",
            SubjectName: "Concrete Structures Design II",
            Number: "251",
            Type: "T",
            Group: "5",
            Day: "Thu",
            TimePeriod: " 10:00 AM - 11:00 AM",
            WeekNumber: "3,5,7,9,11,13",
            Room: "KB326"
        }, {
            Uid: 262,
            SubjectCode: "UEMX2363",
            SubjectName: "Concrete Structures Design II",
            Number: "252",
            Type: "T",
            Group: "6",
            Day: "Thu",
            TimePeriod: " 10:00 AM - 11:00 AM",
            WeekNumber: "2,4,6,8,10,12",
            Room: "KB326"
        }, {
            Uid: 263,
            SubjectCode: "UEMX2423",
            SubjectName: "Geotechnical Engineering",
            Number: "253",
            Type: "L",
            Group: "1",
            Day: "Mon",
            TimePeriod: " 10:00 AM - 12:00 PM",
            WeekNumber: "1-14",
            Room: "KB207"
        }, {
            Uid: 264,
            SubjectCode: "UEMX2423",
            SubjectName: "Geotechnical Engineering",
            Number: "253",
            Type: "L",
            Group: "1",
            Day: "Thu",
            TimePeriod: "  8:00 AM -  9:00 AM",
            WeekNumber: "1-14",
            Room: "KB208"
        }, {
            Uid: 265,
            SubjectCode: "UEMX2423",
            SubjectName: "Geotechnical Engineering",
            Number: "254",
            Type: "P",
            Group: "1",
            Day: "Tue",
            TimePeriod: " 10:00 AM -  1:00 PM",
            WeekNumber: "4,6,8,10",
            Room: "KBS01"
        }, {
            Uid: 266,
            SubjectCode: "UEMX2423",
            SubjectName: "Geotechnical Engineering",
            Number: "255",
            Type: "P",
            Group: "2",
            Day: "Tue",
            TimePeriod: " 10:00 AM -  1:00 PM",
            WeekNumber: "3,7,9,11",
            Room: "KBS01"
        }, {
            Uid: 267,
            SubjectCode: "UEMX2423",
            SubjectName: "Geotechnical Engineering",
            Number: "256",
            Type: "P",
            Group: "3",
            Day: "Wed",
            TimePeriod: "  9:00 AM - 12:00 PM",
            WeekNumber: "4,6,8,10",
            Room: "KBS01"
        }, {
            Uid: 268,
            SubjectCode: "UEMX2423",
            SubjectName: "Geotechnical Engineering",
            Number: "257",
            Type: "P",
            Group: "4",
            Day: "Wed",
            TimePeriod: "  9:00 AM - 12:00 PM",
            WeekNumber: "3,7,9,11",
            Room: "KBS01"
        }, {
            Uid: 269,
            SubjectCode: "UEMX2423",
            SubjectName: "Geotechnical Engineering",
            Number: "258",
            Type: "P",
            Group: "5",
            Day: "Thu",
            TimePeriod: " 10:00 AM -  1:00 PM",
            WeekNumber: "4,6,8,10",
            Room: "KBS01"
        }, {
            Uid: 270,
            SubjectCode: "UEMX2423",
            SubjectName: "Geotechnical Engineering",
            Number: "259",
            Type: "P",
            Group: "6",
            Day: "Thu",
            TimePeriod: " 10:00 AM -  1:00 PM",
            WeekNumber: "3,7,9,11",
            Room: "KBS01"
        }, {
            Uid: 271,
            SubjectCode: "UEMX2423",
            SubjectName: "Geotechnical Engineering",
            Number: "260",
            Type: "P",
            Group: "7",
            Day: "Fri",
            TimePeriod: "  8:30 AM - 11:30 AM",
            WeekNumber: "4,6,8,10",
            Room: "KBS01"
        }, {
            Uid: 272,
            SubjectCode: "UEMX2423",
            SubjectName: "Geotechnical Engineering",
            Number: "261",
            Type: "P",
            Group: "8",
            Day: "Fri",
            TimePeriod: "  8:30 AM - 11:30 AM",
            WeekNumber: "3,7,9,11",
            Room: "KBS01"
        }, {
            Uid: 273,
            SubjectCode: "UEMX2423",
            SubjectName: "Geotechnical Engineering",
            Number: "262",
            Type: "T",
            Group: "1",
            Day: "Mon",
            TimePeriod: " 12:00 PM -  1:00 PM",
            WeekNumber: "3,5,7,9,11,13",
            Room: "KB210"
        }, {
            Uid: 274,
            SubjectCode: "UEMX2423",
            SubjectName: "Geotechnical Engineering",
            Number: "263",
            Type: "T",
            Group: "2",
            Day: "Mon",
            TimePeriod: " 12:00 PM -  1:00 PM",
            WeekNumber: "2,4,6,8,10,12",
            Room: "KB210"
        }, {
            Uid: 275,
            SubjectCode: "UEMX2423",
            SubjectName: "Geotechnical Engineering",
            Number: "264",
            Type: "T",
            Group: "3",
            Day: "Mon",
            TimePeriod: "  4:00 PM -  5:00 PM",
            WeekNumber: "3,5,7,9,11,13",
            Room: "KB516"
        }, {
            Uid: 276,
            SubjectCode: "UEMX2423",
            SubjectName: "Geotechnical Engineering",
            Number: "265",
            Type: "T",
            Group: "4",
            Day: "Mon",
            TimePeriod: "  4:00 PM -  5:00 PM",
            WeekNumber: "2,4,6,8,10,12",
            Room: "KB516"
        }, {
            Uid: 277,
            SubjectCode: "UEMX2423",
            SubjectName: "Geotechnical Engineering",
            Number: "266",
            Type: "T",
            Group: "5",
            Day: "Thu",
            TimePeriod: "  5:00 PM -  6:00 PM",
            WeekNumber: "3,5,7,9,11,13",
            Room: "KB314"
        }, {
            Uid: 278,
            SubjectCode: "UEMX2423",
            SubjectName: "Geotechnical Engineering",
            Number: "267",
            Type: "T",
            Group: "6",
            Day: "Thu",
            TimePeriod: "  5:00 PM -  6:00 PM",
            WeekNumber: "2,4,6,8,10,12",
            Room: "KB314"
        }, {
            Uid: 279,
            SubjectCode: "UEMX2513",
            SubjectName: "Hydrology",
            Number: "268",
            Type: "L",
            Group: "1",
            Day: "Tue",
            TimePeriod: "  3:00 PM -  5:00 PM",
            WeekNumber: "1-14",
            Room: "KB209"
        }, {
            Uid: 280,
            SubjectCode: "UEMX2513",
            SubjectName: "Hydrology",
            Number: "268",
            Type: "L",
            Group: "1",
            Day: "Wed",
            TimePeriod: "  8:00 AM -  9:00 AM",
            WeekNumber: "1-14",
            Room: "KB208"
        }, {
            Uid: 281,
            SubjectCode: "UEMX2513",
            SubjectName: "Hydrology",
            Number: "269",
            Type: "T",
            Group: "1",
            Day: "Mon",
            TimePeriod: " 12:00 PM -  1:00 PM",
            WeekNumber: "3,5,7,9,11,13",
            Room: "KB516"
        }, {
            Uid: 282,
            SubjectCode: "UEMX2513",
            SubjectName: "Hydrology",
            Number: "270",
            Type: "T",
            Group: "2",
            Day: "Mon",
            TimePeriod: " 12:00 PM -  1:00 PM",
            WeekNumber: "2,4,6,8,10,12",
            Room: "KB516"
        }, {
            Uid: 283,
            SubjectCode: "UEMX2513",
            SubjectName: "Hydrology",
            Number: "271",
            Type: "T",
            Group: "3",
            Day: "Mon",
            TimePeriod: "  1:00 PM -  2:00 PM",
            WeekNumber: "3,5,7,9,11,13",
            Room: "KB516"
        }, {
            Uid: 284,
            SubjectCode: "UEMX2513",
            SubjectName: "Hydrology",
            Number: "272",
            Type: "T",
            Group: "4",
            Day: "Mon",
            TimePeriod: "  1:00 PM -  2:00 PM",
            WeekNumber: "2,4,6,8,10,12",
            Room: "KB516"
        }, {
            Uid: 285,
            SubjectCode: "UEMX2513",
            SubjectName: "Hydrology",
            Number: "273",
            Type: "T",
            Group: "5",
            Day: "Tue",
            TimePeriod: "  5:00 PM -  6:00 PM",
            WeekNumber: "3,5,7,9,11,13",
            Room: "KB516"
        }, {
            Uid: 286,
            SubjectCode: "UEMX2513",
            SubjectName: "Hydrology",
            Number: "274",
            Type: "T",
            Group: "6",
            Day: "Tue",
            TimePeriod: "  5:00 PM -  6:00 PM",
            WeekNumber: "2,4,6,8,10,12",
            Room: "KB516"
        }, {
            Uid: 287,
            SubjectCode: "UEMX3333",
            SubjectName: "Structural Steel Design",
            Number: "275",
            Type: "L",
            Group: "1",
            Day: "Tue",
            TimePeriod: "  5:00 PM -  7:00 PM",
            WeekNumber: "1-14",
            Room: "KB208"
        }, {
            Uid: 288,
            SubjectCode: "UEMX3333",
            SubjectName: "Structural Steel Design",
            Number: "275",
            Type: "L",
            Group: "1",
            Day: "Wed",
            TimePeriod: "  4:00 PM -  5:00 PM",
            WeekNumber: "1-14",
            Room: "KB208"
        }, {
            Uid: 289,
            SubjectCode: "UEMX3333",
            SubjectName: "Structural Steel Design",
            Number: "276",
            Type: "T",
            Group: "1",
            Day: "Mon",
            TimePeriod: "  3:00 PM -  4:00 PM",
            WeekNumber: "3,5,7,9,11,13",
            Room: "KB318"
        }, {
            Uid: 290,
            SubjectCode: "UEMX3333",
            SubjectName: "Structural Steel Design",
            Number: "277",
            Type: "T",
            Group: "2",
            Day: "Mon",
            TimePeriod: "  3:00 PM -  4:00 PM",
            WeekNumber: "2,4,6,8,10,12",
            Room: "KB318"
        }, {
            Uid: 291,
            SubjectCode: "UEMX3333",
            SubjectName: "Structural Steel Design",
            Number: "278",
            Type: "T",
            Group: "3",
            Day: "Fri",
            TimePeriod: "  2:30 PM -  3:30 PM",
            WeekNumber: "3,5,7,9,11,13",
            Room: "KB320"
        }, {
            Uid: 292,
            SubjectCode: "UEMX3333",
            SubjectName: "Structural Steel Design",
            Number: "279",
            Type: "T",
            Group: "4",
            Day: "Fri",
            TimePeriod: "  2:30 PM -  3:30 PM",
            WeekNumber: "2,4,6,8,10,12",
            Room: "KB320"
        }, {
            Uid: 293,
            SubjectCode: "UEMX3333",
            SubjectName: "Structural Steel Design",
            Number: "280",
            Type: "T",
            Group: "5",
            Day: "Wed",
            TimePeriod: "  5:00 PM -  6:00 PM",
            WeekNumber: "3,5,7,9,11,13",
            Room: "KB518"
        }, {
            Uid: 294,
            SubjectCode: "UEMX3333",
            SubjectName: "Structural Steel Design",
            Number: "281",
            Type: "T",
            Group: "6",
            Day: "Wed",
            TimePeriod: "  5:00 PM -  6:00 PM",
            WeekNumber: "2,4,6,8,10,12",
            Room: "KB518"
        }, {
            Uid: 295,
            SubjectCode: "UEMX3813",
            SubjectName: "Highway & Transportation",
            Number: "282",
            Type: "L",
            Group: "1",
            Day: "Mon",
            TimePeriod: "  6:00 PM -  7:00 PM",
            WeekNumber: "1-14",
            Room: "KB207"
        }, {
            Uid: 296,
            SubjectCode: "UEMX3813",
            SubjectName: "Highway & Transportation",
            Number: "282",
            Type: "L",
            Group: "1",
            Day: "Wed",
            TimePeriod: " 10:00 AM - 12:00 PM",
            WeekNumber: "1-14",
            Room: "KB214"
        }, {
            Uid: 297,
            SubjectCode: "UEMX3813",
            SubjectName: "Highway & Transportation",
            Number: "283",
            Type: "P",
            Group: "1",
            Day: "Mon",
            TimePeriod: "  2:00 PM -  5:00 PM",
            WeekNumber: "8",
            Room: "KBS01"
        }, {
            Uid: 298,
            SubjectCode: "UEMX3813",
            SubjectName: "Highway & Transportation",
            Number: "283",
            Type: "P",
            Group: "1",
            Day: "Mon",
            TimePeriod: "  2:00 PM -  5:00 PM",
            WeekNumber: "2",
            Room: "KB607"
        }, {
            Uid: 299,
            SubjectCode: "UEMX3813",
            SubjectName: "Highway & Transportation",
            Number: "284",
            Type: "P",
            Group: "2",
            Day: "Mon",
            TimePeriod: "  2:00 PM -  5:00 PM",
            WeekNumber: "10",
            Room: "KBS01"
        }, {
            Uid: 300,
            SubjectCode: "UEMX3813",
            SubjectName: "Highway & Transportation",
            Number: "284",
            Type: "P",
            Group: "2",
            Day: "Mon",
            TimePeriod: "  2:00 PM -  5:00 PM",
            WeekNumber: "4",
            Room: "KB607"
        }, {
            Uid: 301,
            SubjectCode: "UEMX3813",
            SubjectName: "Highway & Transportation",
            Number: "285",
            Type: "P",
            Group: "3",
            Day: "Mon",
            TimePeriod: "  2:00 PM -  5:00 PM",
            WeekNumber: "6",
            Room: "KB607"
        }, {
            Uid: 302,
            SubjectCode: "UEMX3813",
            SubjectName: "Highway & Transportation",
            Number: "285",
            Type: "P",
            Group: "3",
            Day: "Mon",
            TimePeriod: "  2:00 PM -  5:00 PM",
            WeekNumber: "12",
            Room: "KBS01"
        }, {
            Uid: 303,
            SubjectCode: "UEMX3813",
            SubjectName: "Highway & Transportation",
            Number: "286",
            Type: "P",
            Group: "4",
            Day: "Mon",
            TimePeriod: "  2:00 PM -  5:00 PM",
            WeekNumber: "7",
            Room: "KB607"
        }, {
            Uid: 304,
            SubjectCode: "UEMX3813",
            SubjectName: "Highway & Transportation",
            Number: "286",
            Type: "P",
            Group: "4",
            Day: "Mon",
            TimePeriod: "  2:00 PM -  5:00 PM",
            WeekNumber: "11",
            Room: "KBS01"
        }, {
            Uid: 305,
            SubjectCode: "UEMX3813",
            SubjectName: "Highway & Transportation",
            Number: "287",
            Type: "P",
            Group: "5",
            Day: "Thu",
            TimePeriod: "  2:00 PM -  5:00 PM",
            WeekNumber: "2",
            Room: "KB607"
        }, {
            Uid: 306,
            SubjectCode: "UEMX3813",
            SubjectName: "Highway & Transportation",
            Number: "287",
            Type: "P",
            Group: "5",
            Day: "Thu",
            TimePeriod: "  2:00 PM -  5:00 PM",
            WeekNumber: "8",
            Room: "KBS01"
        }, {
            Uid: 307,
            SubjectCode: "UEMX3813",
            SubjectName: "Highway & Transportation",
            Number: "288",
            Type: "P",
            Group: "6",
            Day: "Thu",
            TimePeriod: "  2:00 PM -  5:00 PM",
            WeekNumber: "9",
            Room: "KBS01"
        }, {
            Uid: 308,
            SubjectCode: "UEMX3813",
            SubjectName: "Highway & Transportation",
            Number: "288",
            Type: "P",
            Group: "6",
            Day: "Thu",
            TimePeriod: "  2:00 PM -  5:00 PM",
            WeekNumber: "3",
            Room: "KB607"
        }, {
            Uid: 309,
            SubjectCode: "UEMX3813",
            SubjectName: "Highway & Transportation",
            Number: "289",
            Type: "P",
            Group: "7",
            Day: "Thu",
            TimePeriod: "  2:00 PM -  5:00 PM",
            WeekNumber: "4",
            Room: "KB607"
        }, {
            Uid: 310,
            SubjectCode: "UEMX3813",
            SubjectName: "Highway & Transportation",
            Number: "289",
            Type: "P",
            Group: "7",
            Day: "Thu",
            TimePeriod: "  2:00 PM -  5:00 PM",
            WeekNumber: "10",
            Room: "KBS01"
        }, {
            Uid: 311,
            SubjectCode: "UEMX3813",
            SubjectName: "Highway & Transportation",
            Number: "290",
            Type: "P",
            Group: "8",
            Day: "Thu",
            TimePeriod: "  2:00 PM -  5:00 PM",
            WeekNumber: "12",
            Room: "KBS01"
        }, {
            Uid: 312,
            SubjectCode: "UEMX3813",
            SubjectName: "Highway & Transportation",
            Number: "290",
            Type: "P",
            Group: "8",
            Day: "Thu",
            TimePeriod: "  2:00 PM -  5:00 PM",
            WeekNumber: "6",
            Room: "KB607"
        }, {
            Uid: 313,
            SubjectCode: "UEMX3813",
            SubjectName: "Highway & Transportation",
            Number: "291",
            Type: "P",
            Group: "9",
            Day: "Thu",
            TimePeriod: "  2:00 PM -  5:00 PM",
            WeekNumber: "7",
            Room: "KB607"
        }, {
            Uid: 314,
            SubjectCode: "UEMX3813",
            SubjectName: "Highway & Transportation",
            Number: "291",
            Type: "P",
            Group: "9",
            Day: "Thu",
            TimePeriod: "  2:00 PM -  5:00 PM",
            WeekNumber: "11",
            Room: "KBS01"
        }, {
            Uid: 315,
            SubjectCode: "UEMX3813",
            SubjectName: "Highway & Transportation",
            Number: "292",
            Type: "T",
            Group: "1",
            Day: "Tue",
            TimePeriod: "  2:00 PM -  3:00 PM",
            WeekNumber: "3,5,7,9,11,13",
            Room: "KB326"
        }, {
            Uid: 316,
            SubjectCode: "UEMX3813",
            SubjectName: "Highway & Transportation",
            Number: "293",
            Type: "T",
            Group: "2",
            Day: "Tue",
            TimePeriod: "  2:00 PM -  3:00 PM",
            WeekNumber: "2,4,6,8,10,12",
            Room: "KB326"
        }, {
            Uid: 317,
            SubjectCode: "UEMX3813",
            SubjectName: "Highway & Transportation",
            Number: "294",
            Type: "T",
            Group: "3",
            Day: "Thu",
            TimePeriod: " 11:00 AM - 12:00 PM",
            WeekNumber: "3,5,7,9,11,13",
            Room: "KB314"
        }, {
            Uid: 318,
            SubjectCode: "UEMX3813",
            SubjectName: "Highway & Transportation",
            Number: "295",
            Type: "T",
            Group: "4",
            Day: "Thu",
            TimePeriod: " 11:00 AM - 12:00 PM",
            WeekNumber: "2,4,6,8,10,12",
            Room: "KB314"
        }, {
            Uid: 319,
            SubjectCode: "UEMX3813",
            SubjectName: "Highway & Transportation",
            Number: "296",
            Type: "T",
            Group: "5",
            Day: "Thu",
            TimePeriod: " 12:00 PM -  1:00 PM",
            WeekNumber: "3,5,7,9,11,13",
            Room: "KB314"
        }, {
            Uid: 320,
            SubjectCode: "UEMX3813",
            SubjectName: "Highway & Transportation",
            Number: "297",
            Type: "T",
            Group: "6",
            Day: "Thu",
            TimePeriod: " 12:00 PM -  1:00 PM",
            WeekNumber: "2,4,6,8,10,12",
            Room: "KB314"
        }, {
            Uid: 321,
            SubjectCode: "UEMX4293",
            SubjectName: "Finite Element Method In Structural Engineering",
            Number: "298",
            Type: "L",
            Group: "1",
            Day: "Thu",
            TimePeriod: "  8:00 AM -  9:00 AM",
            WeekNumber: "1-14",
            Room: "KB322"
        }, {
            Uid: 322,
            SubjectCode: "UEMX4293",
            SubjectName: "Finite Element Method In Structural Engineering",
            Number: "298",
            Type: "L",
            Group: "1",
            Day: "Fri",
            TimePeriod: " 10:30 AM - 12:30 PM",
            WeekNumber: "1-14",
            Room: "KB210"
        }, {
            Uid: 323,
            SubjectCode: "UEMX4293",
            SubjectName: "Finite Element Method In Structural Engineering",
            Number: "299",
            Type: "T",
            Group: "1",
            Day: "Thu",
            TimePeriod: " 12:00 PM -  1:00 PM",
            WeekNumber: "3,5,7,9,11,13",
            Room: "KB322"
        }, {
            Uid: 324,
            SubjectCode: "UEMX4293",
            SubjectName: "Finite Element Method In Structural Engineering",
            Number: "300",
            Type: "T",
            Group: "2",
            Day: "Thu",
            TimePeriod: " 12:00 PM -  1:00 PM",
            WeekNumber: "2,4,6,8,10,12",
            Room: "KB322"
        }, {
            Uid: 325,
            SubjectCode: "UEMX4293",
            SubjectName: "Finite Element Method In Structural Engineering",
            Number: "301",
            Type: "T",
            Group: "3",
            Day: "Fri",
            TimePeriod: "  3:30 PM -  4:30 PM",
            WeekNumber: "3,5,7,9,11,13",
            Room: "KB324"
        }, {
            Uid: 326,
            SubjectCode: "UEMX4293",
            SubjectName: "Finite Element Method In Structural Engineering",
            Number: "302",
            Type: "T",
            Group: "4",
            Day: "Fri",
            TimePeriod: "  3:30 PM -  4:30 PM",
            WeekNumber: "2,4,6,8,10,12",
            Room: "KB324"
        }, {
            Uid: 327,
            SubjectCode: "UEMX4313",
            SubjectName: "Advanced Structural Steel Design",
            Number: "303",
            Type: "L",
            Group: "1",
            Day: "Mon",
            TimePeriod: "  2:00 PM -  4:00 PM",
            WeekNumber: "1-14",
            Room: "KB210"
        }, {
            Uid: 328,
            SubjectCode: "UEMX4313",
            SubjectName: "Advanced Structural Steel Design",
            Number: "303",
            Type: "L",
            Group: "1",
            Day: "Tue",
            TimePeriod: "  8:00 AM -  9:00 AM",
            WeekNumber: "1-14",
            Room: "KB324"
        }, {
            Uid: 329,
            SubjectCode: "UEMX4313",
            SubjectName: "Advanced Structural Steel Design",
            Number: "304",
            Type: "T",
            Group: "1",
            Day: "Mon",
            TimePeriod: "  4:00 PM -  5:00 PM",
            WeekNumber: "3,5,7,9,11,13",
            Room: "KB318"
        }, {
            Uid: 330,
            SubjectCode: "UEMX4313",
            SubjectName: "Advanced Structural Steel Design",
            Number: "305",
            Type: "T",
            Group: "2",
            Day: "Mon",
            TimePeriod: "  4:00 PM -  5:00 PM",
            WeekNumber: "2,4,6,8,10,12",
            Room: "KB318"
        }, {
            Uid: 331,
            SubjectCode: "UEMX4313",
            SubjectName: "Advanced Structural Steel Design",
            Number: "306",
            Type: "T",
            Group: "3",
            Day: "Tue",
            TimePeriod: " 10:00 AM - 11:00 AM",
            WeekNumber: "3,5,7,9,11,13",
            Room: "KB318"
        }, {
            Uid: 332,
            SubjectCode: "UEMX4313",
            SubjectName: "Advanced Structural Steel Design",
            Number: "307",
            Type: "T",
            Group: "4",
            Day: "Tue",
            TimePeriod: " 10:00 AM - 11:00 AM",
            WeekNumber: "2,4,6,8,10,12",
            Room: "KB318"
        }, {
            Uid: 333,
            SubjectCode: "UEMX4393",
            SubjectName: "Concrete Technology",
            Number: "308",
            Type: "L",
            Group: "1",
            Day: "Thu",
            TimePeriod: " 10:00 AM - 12:00 PM",
            WeekNumber: "1-14",
            Room: "KB300"
        }, {
            Uid: 334,
            SubjectCode: "UEMX4393",
            SubjectName: "Concrete Technology",
            Number: "308",
            Type: "L",
            Group: "1",
            Day: "Fri",
            TimePeriod: "  8:00 AM -  9:00 AM",
            WeekNumber: "1-14",
            Room: "KB322"
        }, {
            Uid: 335,
            SubjectCode: "UEMX4393",
            SubjectName: "Concrete Technology",
            Number: "309",
            Type: "P",
            Group: "1",
            Day: "Tue",
            TimePeriod: "  2:00 PM -  4:00 PM",
            WeekNumber: "1,3,7,9,11,13",
            Room: "KBS01"
        }, {
            Uid: 336,
            SubjectCode: "UEMX4393",
            SubjectName: "Concrete Technology",
            Number: "310",
            Type: "P",
            Group: "2",
            Day: "Tue",
            TimePeriod: "  2:00 PM -  4:00 PM",
            WeekNumber: "2,4,6,8,10,12",
            Room: "KBS01"
        }, {
            Uid: 337,
            SubjectCode: "UEMX4393",
            SubjectName: "Concrete Technology",
            Number: "311",
            Type: "P",
            Group: "3",
            Day: "Wed",
            TimePeriod: "  2:00 PM -  4:00 PM",
            WeekNumber: "1,3,7,9,11,13",
            Room: "KBS01"
        }, {
            Uid: 338,
            SubjectCode: "UEMX4393",
            SubjectName: "Concrete Technology",
            Number: "312",
            Type: "T",
            Group: "1",
            Day: "Fri",
            TimePeriod: "  9:00 AM - 10:00 AM",
            WeekNumber: "3,5,7,9,11,13",
            Room: "KB322"
        }, {
            Uid: 339,
            SubjectCode: "UEMX4393",
            SubjectName: "Concrete Technology",
            Number: "313",
            Type: "T",
            Group: "2",
            Day: "Fri",
            TimePeriod: "  9:00 AM - 10:00 AM",
            WeekNumber: "2,4,6,8,10,12",
            Room: "KB322"
        }, {
            Uid: 340,
            SubjectCode: "UEMX4913",
            SubjectName: "Integrated Design Project",
            Number: "314",
            Type: "L",
            Group: "1",
            Day: "Wed",
            TimePeriod: " 12:00 PM -  2:00 PM",
            WeekNumber: "1",
            Room: "KB209"
        }, {
            Uid: 341,
            SubjectCode: "UEMX4913",
            SubjectName: "Integrated Design Project",
            Number: "314",
            Type: "L",
            Group: "1",
            Day: "Thu",
            TimePeriod: "  3:00 PM -  6:00 PM",
            WeekNumber: "1",
            Room: "KB208"
        }, {
            Uid: 342,
            SubjectCode: "UEMX4963",
            SubjectName: "Engineering Application In Environment",
            Number: "315",
            Type: "L",
            Group: "1",
            Day: "Mon",
            TimePeriod: "  1:00 PM -  2:00 PM",
            WeekNumber: "1-14",
            Room: "KB210"
        }, {
            Uid: 343,
            SubjectCode: "UEMX4963",
            SubjectName: "Engineering Application In Environment",
            Number: "315",
            Type: "L",
            Group: "1",
            Day: "Wed",
            TimePeriod: "  8:00 AM - 10:00 AM",
            WeekNumber: "1-14",
            Room: "KB301"
        }, {
            Uid: 344,
            SubjectCode: "UEMX4963",
            SubjectName: "Engineering Application In Environment",
            Number: "316",
            Type: "T",
            Group: "1",
            Day: "Mon",
            TimePeriod: " 10:00 AM - 11:00 AM",
            WeekNumber: "3,5,7,9,11,13",
            Room: "KB517"
        }, {
            Uid: 345,
            SubjectCode: "UEMX4963",
            SubjectName: "Engineering Application In Environment",
            Number: "317",
            Type: "T",
            Group: "2",
            Day: "Mon",
            TimePeriod: " 10:00 AM - 11:00 AM",
            WeekNumber: "2,4,6,8,10,12",
            Room: "KB517"
        }, {
            Uid: 346,
            SubjectCode: "UEMX4963",
            SubjectName: "Engineering Application In Environment",
            Number: "318",
            Type: "T",
            Group: "3",
            Day: "Mon",
            TimePeriod: " 11:00 AM - 12:00 PM",
            WeekNumber: "3,5,7,9,11,13",
            Room: "KB517"
        }, {
            Uid: 347,
            SubjectCode: "UEMX4963",
            SubjectName: "Engineering Application In Environment",
            Number: "319",
            Type: "T",
            Group: "4",
            Day: "Mon",
            TimePeriod: " 11:00 AM - 12:00 PM",
            WeekNumber: "2,4,6,8,10,12",
            Room: "KB517"
        }, {
            Uid: 348,
            SubjectCode: "UJLL1093",
            SubjectName: "Introduction To Korean",
            Number: "320",
            Type: "L",
            Group: "1",
            Day: "Wed",
            TimePeriod: "  8:00 AM - 10:00 AM",
            WeekNumber: "1-14",
            Room: "KB211"
        }, {
            Uid: 349,
            SubjectCode: "UJLL1093",
            SubjectName: "Introduction To Korean",
            Number: "321",
            Type: "T",
            Group: "1",
            Day: "Wed",
            TimePeriod: " 10:00 AM - 11:00 AM",
            WeekNumber: "1-14",
            Room: "KB319"
        }, {
            Uid: 350,
            SubjectCode: "UJLL1093",
            SubjectName: "Introduction To Korean",
            Number: "322",
            Type: "T",
            Group: "2",
            Day: "Wed",
            TimePeriod: " 11:00 AM - 12:00 PM",
            WeekNumber: "1-14",
            Room: "KB319"
        }, {
            Uid: 351,
            SubjectCode: "UKMM1011",
            SubjectName: "Sun Zi's Art Of War & Business Strategies",
            Number: "323",
            Type: "L",
            Group: "1",
            Day: "Tue",
            TimePeriod: "  8:00 AM -  9:00 AM",
            WeekNumber: "1-14",
            Room: "KB210"
        }, {
            Uid: 352,
            SubjectCode: "UKMM1011",
            SubjectName: "Sun Zi's Art Of War & Business Strategies",
            Number: "324",
            Type: "L",
            Group: "2",
            Day: "Tue",
            TimePeriod: "  1:00 PM -  2:00 PM",
            WeekNumber: "1-14",
            Room: "KB210"
        }, {
            Uid: 353,
            SubjectCode: "UKMM1011",
            SubjectName: "Sun Zi's Art Of War & Business Strategies",
            Number: "325",
            Type: "L",
            Group: "3",
            Day: "Tue",
            TimePeriod: "  2:00 PM -  3:00 PM",
            WeekNumber: "1-14",
            Room: "KB210"
        }, {
            Uid: 354,
            SubjectCode: "UKMM1043",
            SubjectName: "Basic Economics, Accounting & Management",
            Number: "326",
            Type: "L",
            Group: "1",
            Day: "Mon",
            TimePeriod: "  2:00 PM -  4:00 PM",
            WeekNumber: "1-14",
            Room: "KB324"
        }, {
            Uid: 355,
            SubjectCode: "UKMM1043",
            SubjectName: "Basic Economics, Accounting & Management",
            Number: "327",
            Type: "L",
            Group: "2",
            Day: "Thu",
            TimePeriod: "  5:00 PM -  7:00 PM",
            WeekNumber: "1-14",
            Room: "KB316"
        }, {
            Uid: 356,
            SubjectCode: "UKMM1043",
            SubjectName: "Basic Economics, Accounting & Management",
            Number: "328",
            Type: "T",
            Group: "1",
            Day: "Mon",
            TimePeriod: "  5:00 PM -  6:30 PM",
            WeekNumber: "1-14",
            Room: "KB318"
        }, {
            Uid: 357,
            SubjectCode: "UKMM1043",
            SubjectName: "Basic Economics, Accounting & Management",
            Number: "330",
            Type: "T",
            Group: "3",
            Day: "Tue",
            TimePeriod: "  5:00 PM -  6:30 PM",
            WeekNumber: "1-14",
            Room: "KB320"
        }, {
            Uid: 358,
            SubjectCode: "UKMM1043",
            SubjectName: "Basic Economics, Accounting & Management",
            Number: "331",
            Type: "T",
            Group: "5",
            Day: "Thu",
            TimePeriod: " 11:30 AM -  1:00 PM",
            WeekNumber: "1-14",
            Room: "KB516"
        }, {
            Uid: 359,
            SubjectCode: "UKMM1043",
            SubjectName: "Basic Economics, Accounting & Management",
            Number: "332",
            Type: "T",
            Group: "6",
            Day: "Fri",
            TimePeriod: "  2:30 PM -  4:00 PM",
            WeekNumber: "1-14",
            Room: "KB318"
        }, {
            Uid: 360,
            SubjectCode: "UKMM1043",
            SubjectName: "Basic Economics, Accounting & Management",
            Number: "333",
            Type: "T",
            Group: "7",
            Day: "Fri",
            TimePeriod: "  4:00 PM -  5:30 PM",
            WeekNumber: "1-14",
            Room: "KB318"
        }
    ];
    return cache;
};
//# sourceMappingURL=heng_2017_apr.js.map