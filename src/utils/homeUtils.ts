import { HOME_UI_CONSTANTS } from '../constants/homeUiConstants';

export const calculateNavBarMargins = (drawerOpen: boolean) => {
  // Menu icon width + desired gap (12px + 60px)
  const navBarMarginLeft = drawerOpen
    ? HOME_UI_CONSTANTS.NAV_BAR_MARGIN_LEFT_DRAWER_OPEN
    : HOME_UI_CONSTANTS.NAV_BAR_MARGIN_LEFT_DRAWER_CLOSED;
  // Top margin to align with Cliniio logo
  const navBarMarginTop = HOME_UI_CONSTANTS.NAV_BAR_MARGIN_TOP;

  return {
    navBarMarginLeft,
    navBarMarginTop,
  };
};
