import style from "./dist/css/style.css";
import BrevizLogo from "./dist/images/brelogo.svg";
import EA from "./dist/images/ea.svg";
import Coder from "./dist/images/coder.svg";
import Earnings from "./dist/images/earnings.svg";
import { Animated } from "react-animated-css";
import { Component } from "react";
import { connect } from "react-redux";
import UploadActions from '../UploadTranscript/UploadActions'
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import classNames from '../../Utilities/classNameUtil'
import UploadUtils from '../../Utilities/UploadUtils'

console.log(UploadUtils,'<-----------------UploadActions')

class SitePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textValue: this.props.SummaryText,
      buttonOutterClass: "",
    };
    this.sendZoomTranscript = UploadUtils.sendZoomTranscript.bind(this)
    this.readFileContent = UploadUtils.readFileContent.bind(this)
    this.sendOtterTranscript = UploadUtils.sendOtterTranscript.bind(this)
    this.setNameOfTranscript = UploadUtils.setNameOfTranscript.bind(this)
    this.readFileAndSend = UploadUtils.readFileAndSend.bind(this)
    this.setParamValues = UploadUtils.setParamValues.bind(this)
  }

  render() {
    console.log(style)
    const { buttonOutterClass } = this.state;
    console.log("here");
    return (
      <div className={classNames([style['is-boxed'], style['has-animations'], style['bodyTag']])}>
        <div className={style['body-wrap']}>
          <header className={style['site-header']}>
            <div className={style['containStatic']}>
              <div className={style['site-header-inner']}>
                <div className={classNames([style['brand'],style['header-brand']])}>
                  <h1 className={classNames([style['h1'],style['m-0']])}>
                    <a href="/">
                      <img
                        className={style['header-logo-image']}
                        src={BrevizLogo}
                        alt="Logo"
                      />
                    </a>
                  </h1>
                </div>
                <Link to={"./id:dummySummary"} className={classNames([style['button'],style['button-primary']])}>Summary Dashboard</Link>
              </div>
            </div>
          </header>

          <div className={style['main']}>
            <section className={style['hero']}>
              <div className={style['containStatic']}>
                <div className={style['hero-inner']}>
                  <div className={style['hero-copy']}>
                    <h1 className={classNames([style['hero-title'], style['mt-0'], style['h1']])}>
                      Bring Brevity to Your Meetings!
                    </h1>
                    <p className={classNames([style['text-sm'],style[' mb-0']])}>
                      A tool to summarize your meetings and make suggestions of
                      what actions to take after
                    </p>
                    <div className={style['hero-cta']}>
                      <label className={classNames([style['button'],style['button-primary']])} >
                        Upload WebVTT Transcript
                        <input className={style['hidden-file-input']} type={'file'} onChange={this.sendZoomTranscript} />
                      </label>
                      {/* <label className={style["button"]} >
                      Upload Otter Transcript
                      <input className={style['hidden-file-input']} type={'file'} onChange={this.sendOtterTranscript} />
                      </label> */}
                    </div>
                  </div>
                  {/* <div className={classNames([style['hero-figure'] ,style['anime-element']])}>
                    <svg
                      className={style['placeholder']}
                      width="528"
                      height="396"
                      viewBox="0 0 528 396"
                    >
                      <rect
                        width="528"
                        height="396"
                        style={{ fill: "transparent" }}
                      />
                    </svg>
                    <div
                      className={classNames([style['hero-figure-box'], style['hero-figure-box-01']])}
                      dataRotation="45deg"
                    ></div>
                    <div
                      className={classNames([style['hero-figure-box'], style['hero-figure-box-02']])}
                      dataRotation="-45deg"
                    ></div>
                    <div
                      className={classNames([style['hero-figure-box'], style['hero-figure-box-03']])}
                      dataRotation="0deg"
                    ></div>
                    <div
                      className={classNames([style['hero-figure-box'], style['hero-figure-box-04']])}
                      dataRotation="-135deg"
                    ></div>
                    <div className={classNames([style['hero-figure-box'], style['hero-figure-box-05']])}></div>
                    <div className={classNames([style['hero-figure-box'], style['hero-figure-box-06']])}></div>
                    <div className={classNames([style['hero-figure-box'], style['hero-figure-box-07']])}></div>
                    <div
                      className={classNames([style['hero-figure-box'], style['hero-figure-box-08']])}
                      dataRotation="-22deg"
                    ></div>
                    <div
                      className={classNames([style['hero-figure-box'], style['hero-figure-box-09']])}
                      dataRotation="-52deg"
                    ></div>
                    <div
                      className={classNames([style['hero-figure-box'], style['hero-figure-box-10']])}
                      dataRotation="-50deg"
                    ></div>
                  </div> */}
                </div>
              </div>
            </section>

            <section className={style['features section']}>
              <div className={style['containStatic']}>
                <div className={style['features-inner section-inner has-bottom-divider']}>
                  <div className={style['features-wrap']}>
                    <div className={classNames([style['feature'], style['text-center'], style['is-revealing']])}>
                      <div className={style['feature-inner']}>
                        <div className={style['feature-icon']}>
                          <img src={EA} alt="Feature 01" />
                        </div>
                        <h4 className={classNames([style['feature-title mt-24'],style['h4']])}>
                          Executive Assistants
                        </h4>
                        <p className={classNames([style['text-sm'],style[' mb-0']])}>
                          Improve your note taking ability, taking notes over
                          virtual meetings is hard and Breviz is here to help
                          you do exactly that
                        </p>
                      </div>
                    </div>
                    <div className={classNames([style['feature'], style['text-center'], style['is-revealing']])}>
                      <div className={style['feature-inner']}>
                        <div className={style['feature-icon']}>
                          <img src={Earnings} alt="Feature 02" />
                        </div>
                        <h4 className={classNames([style['feature-title'], style['mt-24'],style['h4']])}>Buy Side Analysts</h4>
                        <p className={classNames([style['text-sm'],style['mb-0']])}>
                          Reading/Listening to Earning Calls take too long, the
                          real information is all over the place. Breviz will
                          make your life easier
                        </p>
                      </div>
                    </div>
                    <div className={classNames([style['feature'],style['text-center'], style['is-revealing']])}>
                      <div className={style['feature-inner']}>
                        <div className={style['feature-icon']}>
                          <img src={Coder} alt="Feature 03" />
                        </div>
                        <h4 className={classNames([style['feature-title'], style['mt-24'],style['h4']])}>Product Owners</h4>
                        <p className={classNames([style['text-sm'],style['mb-0']])}>
                          Can't keep track of scrum meetings, don't know who
                          attended and who said what. Breviz will keep track for
                          you, can be integraded with major productivity tools
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className={style['cta section']}>
              <div className={style['containStatic']}>
                <div className={classNames([style['cta-inner'], style['section-inner']])}>
                  <h3 className={classNames([style['section-title'], style['mt-0'],style['h3']])}>
                    Are you interested inlearning more about Breviz
                  </h3>
                  <div className={style['cta-cta']}>
                    <a
                     className={classNames([style['button'],style['button-primary'],style['button-wide-mobile']])}
                      href="mailto:fastankitmehta@gmail.com"
                    >
                      Get in touch
                    </a>
                  </div>
                </div>
              </div>
            </section>
            </div>

          <footer className={style['site-footer']}>
            <div className={style['containStatic']}>
              <div className={style['site-footer-inner']}>
                <div className={classNames([style['brand'], style['footer-brand']])}>
                  <a href="/">
                    <img
                      className={style['header-logo-image']}
                      src={BrevizLogo}
                      alt="Logo"
                    />
                  </a>
                </div>
                {/* <ul className={style['footer-links list-reset">
                            <li>
                                <a href="#">Contact</a>
                            </li>
                            <li>
                                <a href="#">About us</a>
                            </li>
                            <li>
                                <a href="#">FAQ's</a>
                            </li>
                            <li>
                                <a href="#">Support</a>
                            </li>
                        </ul> */}
                <ul className={classNames([style['footer-social-links'],style['list-reset']])}>
                  <li>
                    <a href="/">
                      <span className={style['screen-reader-text']}>Facebook</span>
                      <svg
                        width="16"
                        height="16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.023 16L6 9H3V6h3V4c0-2.7 1.672-4 4.08-4 1.153 0 2.144.086 2.433.124v2.821h-1.67c-1.31 0-1.563.623-1.563 1.536V6H13l-1 3H9.28v7H6.023z"
                          fill="#0270D7"
                        />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a href="/">
                      <span className={style['screen-reader-text']}>Twitter</span>
                      <svg
                        width="16"
                        height="16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16 3c-.6.3-1.2.4-1.9.5.7-.4 1.2-1 1.4-1.8-.6.4-1.3.6-2.1.8-.6-.6-1.5-1-2.4-1-1.7 0-3.2 1.5-3.2 3.3 0 .3 0 .5.1.7-2.7-.1-5.2-1.4-6.8-3.4-.3.5-.4 1-.4 1.7 0 1.1.6 2.1 1.5 2.7-.5 0-1-.2-1.5-.4C.7 7.7 1.8 9 3.3 9.3c-.3.1-.6.1-.9.1-.2 0-.4 0-.6-.1.4 1.3 1.6 2.3 3.1 2.3-1.1.9-2.5 1.4-4.1 1.4H0c1.5.9 3.2 1.5 5 1.5 6 0 9.3-5 9.3-9.3v-.4C15 4.3 15.6 3.7 16 3z"
                          fill="#0270D7"
                        />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a href="/">
                      <span className={style['screen-reader-text']}>Google</span>
                      <svg
                        width="16"
                        height="16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.9 7v2.4H12c-.2 1-1.2 3-4 3-2.4 0-4.3-2-4.3-4.4 0-2.4 2-4.4 4.3-4.4 1.4 0 2.3.6 2.8 1.1l1.9-1.8C11.5 1.7 9.9 1 8 1 4.1 1 1 4.1 1 8s3.1 7 7 7c4 0 6.7-2.8 6.7-6.8 0-.5 0-.8-.1-1.2H7.9z"
                          fill="#0270D7"
                        />
                      </svg>
                    </a>
                  </li>
                </ul>
                <div className={style['footer-copyright']}>
                  &copy; 2021 Breviz, all rights reserved
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { SummaryListReducer = {} } = state;
  // console.log(SummaryListReducer, "<-----------------SummaryListReducer");
  const { clickedText } = SummaryListReducer;
  return {
    clickedText,
  };
};
const mapDispatchToProps = (dispatch) => ({
  sendAndSetTranscriptJSON: bindActionCreators(
    UploadActions.sendAndSetTranscriptJSON,
    dispatch
  ),
  sendTranscriptText: bindActionCreators(
    UploadActions.sendTranscriptText,
    dispatch
  ),
  setFileName: bindActionCreators(
    UploadActions.setFileName,
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SitePage));
