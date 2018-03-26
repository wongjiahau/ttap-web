# TODO
1-[x] Changing setting should set the current slot store
2-[x] Fix `Show slots` problem, select ASSD then click on Show Slots then you'll understand
3-[X] Got bug when trying to generalized slots of Chemical Engineering Laboratory I
4-[X] Fix save timetable as picture problem (not rendering correctly anymore)
5-[x] Fix timetableSummary problem
6-[] Implement new FindTimetable using the following algo:
    - Partition slot into FullWeekSlot and PartialWeekSlot
    - Find timetables on list of FullWeekSlot
    - then based on the found timetables, used them to permutate new timetabes with every combination of PartialWeekSlot
7-[x] - release global dependencies on RawSlot static methods

8-[x] Fix bug of <button> should not be embedded inside <button> for slotView

9-[X] Fix failing unit test
10-[X] Fix error thrown by Typescript Compiler
11-[X] merge this branch into master
12-[X] Bug:
    - Step to reproduce
        1. Select FM1
        2. Deselect some specific slots
        3. Open SetTimeConstraintView
        4. Click on some greenbox
        5. Click on the same greenbox again
        6. Expected the box to appear back but in actual it disappear magically
13-[] Build horizontal lines
14-[] Speed up unit test
15-[X] Datepicker will close when click on any thing (flatpickr)
    - consider going for react-datetime

16-[x] Feedback or bug report should open in new tab
- Complete the code for TTAP-analysis
17-[X] Bug: VerticalAlign causes otherStuffDrawer cannot be opened
18-[]-Suggesion-人性化的選擇：排Practical before Lecture, because practical usually ends early
19-[X] Serious Bug:
    - Step to reproduce
    1. Select a subject
    2. Go click some green box
    3. Select more subject
    4. Go click some green box
    5. Declick green box, expected green box to appear, but it was gone

20-[X]-Snackbar should close when opening slot table view
