/** Styling */
import Classes from "./LoadingForm.module.css";

/** Assets Packages */
import * as IMAGE from "../assets/img/index";

/**
 * Loading Animation
 * @returns {JSX.Element}
 */
export default function LoadingForm() {
  return (
    <div>
      <div className={Classes.containerAlign}>
        <img
          src={IMAGE.LOADING}
          alt={IMAGE.ALT_LOADING}
          className={Classes.loadingGif}
        />
      </div>
    </div>
  );
}
