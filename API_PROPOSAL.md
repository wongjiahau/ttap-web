# Proposal : UTAR Course Registration System API

## Problem
Currently, there are no official way to obtain the timeslots data from UTAR Course Registration System (UCRS). Nonetheless, there are some workaround for getting those timeslots data, for example through [Web Scrapping](https://en.wikipedia.org/wiki/Web_scraping). However, such method is not **reliable**, because a *slight* change in the way the server display those timeslots data would cause applications that load data with such method to have *severe* integration error.

## Purpose of the API
The purpose of this API is to allow third party developers to build application on top of UCRS easily without hassle. 

### Assumption
Let us assume that students from the same course will have the same timeslots view regardless of their Year & Semester of study. For example, let say Ali and Abu are both from Civil Engineering, while Ali is in Y4/S3 and Abu is in Y1/S1, although their year of study is different, they should have the same view of timeslots available.

### Functionality of the API 
Based on the assumption above, the API shall allow 3rd party developers to : 
- (F1) Retrieve timeslots data given a specific course code (e.g. UESE160501 which stands for Software Engineering)
- (F2) Retrieve list of available course code and course name. 

## Proposed Schema
- (S1) All API access is over HTTPS, and accessed from https://api.utar.edu.my/crs. (CRS stands for Course Registration System).
- (S2) All data is sent and received as JSON. 
- (S3) Should support Cross Origin Resource Sharing as [recommended](https://www.w3.org/TR/cors/) by W3C.

## Examples
To further understand how the API should work, let us look at some examples. 
### For functionality F1
#### Signature
```
https://api.utar.edu.my/crs/<course_code>
```
#### Example request
```
https://api.utar.edu.my/crs/UESE160501
```

#### Example response
```js
{
    date_retrieved: "2017-11-30T02:06:50.649Z",
    data : [
        {
            code: "MPU3113",
            name: "hubungan etnik (for local students)",
            credit_hour: "3.0"
            slots: [
            	{
                    no:         "1",
                    type:       "L",
                    group:      "1",
                    class_size: "80",
                    day:        "Mon",
                    time:       "08:00 AM - 11:00 AM",
                    hour:       "3.0",
                    week:       "1-14",
                    room:       "KB316"
                }
            ]
        }
    ]
}

```

### For functionality F2
#### Example request
```
https://api.utar.edu.my/crs/all_course_code
```
#### Example response
```js
{
    date_retrieved: "2017-11-30T02:06:50.649Z",
    data : [
        {
            code: "UESE160501",
            name: "bachelor of science (hons) software engineering"
        },
        {
            code: "UBAT160101",
            name: "bachelor of accounting (hons)"
        }
    ]
}

```
