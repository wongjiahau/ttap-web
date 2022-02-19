import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import * as React from "react";
import { Redirect } from "react-router";
import { IRawSlot } from "../model/rawSlot";
import ParseStudentHtmlToRawSlot_v1 from "../parser/parseStudentHtmlToRawSlot";
import ParseStudentHtmlToRawSlot_v2 from "../parser/parseStudentHtmlToRawSlot_v2";
import { Str } from "../util/str";
import { StackPanel } from "./panels/stackPanel";
import { getLoadingElement, LoadSlotsFromUrl } from "./selectCourseView";

const ParseStudentHtmlToRawSlot = (() => {
  const currentYear = new Date().getFullYear();
  if (currentYear > 2019) {
    console.log("Using ParseStudentHtmlToRawSlot_v2");
    return ParseStudentHtmlToRawSlot_v2;
  } else {
    console.log("Using ParseStudentHtmlToRawSlot_v1");
    return ParseStudentHtmlToRawSlot_v1;
  }
})();

const divStyle: React.CSSProperties = {
  textAlign: "center",
  display: "grid",
};

const iframeStyle: React.CSSProperties = {
  height: "490px",
  width: "500px",
};

const debugging = false;
const URL = debugging
  ? "https://wongjiahau.github.io/mock-utar-unitreg/"
  : "https://unitreg.utar.edu.my/portal/courseRegStu/login.jsp";

export interface ILoginDispatchProps {
  handleLoadSlots: (rawSlots: IRawSlot[]) => void;
}

interface ILoginStateProps {
  redirect: boolean;
  openErrorDialog: boolean;
  loading: boolean;
  openAddSlotManuallyDialog: boolean;
}

export class Login extends React.Component<
  ILoginDispatchProps,
  ILoginStateProps
> {
  private currentPage: number = 1;
  private htmls: string[] = [];
  public constructor(props: ILoginDispatchProps) {
    super(props);
    this.state = {
      redirect: false,
      openErrorDialog: false,
      openAddSlotManuallyDialog: false,
      loading: false,
    };
  }

  public render() {
    if (this.state.loading) {
      return getLoadingElement();
    }
    if (this.state.redirect) {
      return <Redirect push={true} to="/play" />;
    }
    return (
      <div style={divStyle}>
        <div
          style={{
            display: "grid",
            alignContent: "center",
            justifyContent: "center",
            gridGap: "12px",
            justifyItems: "center",
          }}
        >
          <Typography variant="h6">
            Please wait for the login page to appear.
          </Typography>
          <iframe
            id="unitregiframe"
            scrolling="no"
            style={iframeStyle}
            onLoad={this.handleIFrameOnLoad}
            src={URL}
          />
          <StackPanel orientation="horizontal" horizontalAlignment="center">
            <Button
              variant="contained"
              color="secondary"
              onClick={this.handleRefresh}
            >
              Refresh
            </Button>
            <p />
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleLoadDemo}
            >
              TRY DEMO
            </Button>
          </StackPanel>
          <Button
            onClick={() => this.setState({ openAddSlotManuallyDialog: true })}
          >
            Add slots manually
          </Button>
        </div>
        <Dialog open={this.state.openAddSlotManuallyDialog}>
          <DialogTitle>Add slots manually</DialogTitle>
          <DialogContent>
            <textarea
              style={{ height: "100px" }}
              id="htmlarea"
              placeholder="Paste HTML here"
            />
            <br />
            <a href="https://github.com/wongjiahau/ttap-web/blob/master/HowToAddSlotManually.md">
              How to add slots manually?
            </a>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() =>
                this.setState({ openAddSlotManuallyDialog: false })
              }
            >
              Cancel
            </Button>
            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                const textarea = document.getElementById(
                  "htmlarea"
                ) as HTMLTextAreaElement;
                try {
                  this.props.handleLoadSlots(
                    ParseStudentHtmlToRawSlot(textarea.value)
                  );
                  this.setState({ redirect: true });
                } catch (error) {
                  alert("Failed. Make sure you paste in the correct content.");
                }
              }}
            >
              ADD SLOTS
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={this.state.openErrorDialog}>
          <DialogTitle>We can't load the data :(</DialogTitle>
          <DialogContent>
            <DialogContentText>
              It may be due to the following reasons:
            </DialogContentText>
            <ul>
              <li>You have not met your Academic Advisor(AA).</li>
              <li>Your time to view the data have not reach yet.</li>
              <li>Internal error of TTAP.</li>
            </ul>
            <Typography gutterBottom={true}>
              To understand what's wrong, log in to{" "}
              <a href="https://unitreg.utar.edu.my/" target="_blank">
                https://unitreg.utar.edu.my/
              </a>{" "}
              with your account.
            </Typography>
            <Typography gutterBottom={true}>
              Or do you want to try the demo instead?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose}>No thanks</Button>
            <Button
              variant="contained"
              onClick={this.handleLoadDemo}
              color="primary"
            >
              TRY DEMO
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  public handleLoadDemo = () => {
    this.handleClose();
    LoadSlotsFromUrl(
      "https://raw.githubusercontent.com/wongjiahau/ttap-datahub/master/Demo.json",
      "json",
      () => this.setState({ loading: true }),
      (slots) => {
        this.props.handleLoadSlots(slots);
        this.setState({ loading: false, redirect: true });
      },
      (error) => alert(error)
    );
  };

  private iframeOnLoadCount = 0;
  public handleIFrameOnLoad = () => {
    this.iframeOnLoadCount++;
    const iframe = document.getElementById(
      "unitregiframe"
    ) as HTMLIFrameElement;
    if (iframe === null) {
      return alert("iframe is null");
    }
    if (iframe.contentWindow === null) {
      return alert("iframe.contentWindow is null");
    }
    const newLocation = new Str(iframe.contentWindow.location.href);
    const loggedIn = !newLocation.Contains("login");

    // this is to prevent infinite loading the same page
    if (this.iframeOnLoadCount > 10) {
      this.setState({ openErrorDialog: true });
      return;
    }

    if (loggedIn && !newLocation.Contains("masterSchedule")) {
      iframe.src =
        "http://unitreg.utar.edu.my/portal/courseRegStu/schedule/masterSchedule.jsp";
      return;
    }
    if (newLocation.Contains("masterSchedule")) {
      const currentHtml = iframe.contentWindow.document.body.innerHTML;
      this.htmls.push(currentHtml);
      if (
        new Str(currentHtml).Contains(`changePage('${this.currentPage + 1}')`)
      ) {
        this.currentPage++;
        (iframe.contentWindow as any)["changePage"](this.currentPage); // changePage is a function defined in <script></script>
      } else {
        try {
          // Logout from the unitreg page
          // To free up the connection to server
          // So that the server won't be overwhelmed
          iframe.src =
            "https://unitreg.utar.edu.my/portal/courseRegStu/logout.jsp";

          // Parse the HTML data
          this.props.handleLoadSlots(
            this.htmls
              .map(ParseStudentHtmlToRawSlot)
              .reduce((x, y) => x.concat(y))
          );
          this.setState({ redirect: true });
        } catch (error) {
          this.htmls = []; // Clear previous stored HTMLS
          this.setState({ openErrorDialog: true });
          console.log(error);
        }
      }
    }
  };

  public handleRefresh = () => {
    const iframe = document.getElementById(
      "unitregiframe"
    ) as HTMLIFrameElement;
    iframe.src = iframe.src;
  };

  public handleClose = () => {
    this.setState({ openErrorDialog: false });
  };

  public componentDidMount() {
    // Check if user is using the Electron-based TTAP Desktop Client
    // Refer https://github.com/electron/electron/issues/2288
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.indexOf(" electron/") > -1) {
      // OK, good
    } else {
      // Redirect the user to go download TTAP-Desktop
      alert("Please download the desktop version of TTAP.");
      window.location.href = "https://get-ttap.surge.sh";
    }
  }
}
