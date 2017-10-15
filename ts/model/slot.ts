export default class Slot {
    private static hash = 0;
    public readonly HashId: number; // Unique for every slot object
    public SubjectCode: string;
    public SubjectName: string;
    public Number: string;
    public Type: string;
    public Group: string;
    public Day: string;
    public TimePeriod: string;
    public WeekNumber: string;
    public Room: string;
    constructor() {
        this.HashId = Slot.hash;
        Slot.hash++;

    }
    public toString = (): string => {
        return `---
    SubjectCode : ${this.SubjectCode     }
    SubjectName : ${this.SubjectName     }
    Number      : ${this.Number          }
    Type        : ${this.Type            }
    Group       : ${this.Group           }
    Day         : ${this.Day             }
    TimePeriod  : ${this.TimePeriod      }
    WeekNumber  : ${this.WeekNumber      }
    Room        : ${this.Room            }
`;

    }
}
