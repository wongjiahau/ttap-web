# TODO

[x] Changing setting should set the current slot store
[x] Fix `Show slots` problem, select ASSD then click on Show Slots then you'll understand
[X] Got bug when trying to generalized slots of Chemical Engineering Laboratory I
[X] Fix save timetable as picture problem (not rendering correctly anymore)
[x] Fix timetableSummary problem
[] Implement new FindTimetable using the following algo:
    - Partition slot into FullWeekSlot and PartialWeekSlot
    - Find timetables on list of FullWeekSlot
    - then based on the found timetables, used them to permutate new timetabes with every combination of PartialWeekSlot
[x] - release global dependencies on RawSlot static methods

[x] Fix bug of <button> should not be embedded inside <button> for slotView

[X] Fix failing unit test
[X] Fix error thrown by Typescript Compiler
[X] merge this branch into master
[] Bug:
    - Step to reproduce
        1. Select FM1
        2. Deselect some specific slots
        3. Open SetTimeConstraintView
        4. Click on some greenbox
        5. Click on the same greenbox again
        6. Expected the box to appear back but in actual it disappear magically
[] Build horizontal lines
[] Speed up unit test
[] Datepicker will close when click on any thing (flatpickr)
    - consider going for react-datetime

- Complete the code for TTAP-analysis