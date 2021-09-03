/** Assets Packages */
import * as IMAGE from "../assets/img/index";

/** Styling */
import Classes from "./ErrorForm.module.css";

/**
 * Display error message and representative image
 * @param {*} props
 * @returns {JSX.Element}
 */
export default function ErrorForm(props) {
  return (
    <div>
      <div className={Classes.containerAlign}>
        <img
          src={IMAGE.ERROR}
          alt={IMAGE.ALT_ERROR}
          className={Classes.errorImg}
        />
      </div>
      <div className={Classes.containerText}>
        <h2>{props.msg}</h2>
      </div>
    </div>
  );
}
