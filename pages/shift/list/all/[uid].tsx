import ShiftsAll from "../../../../components/organisms/manager/ShiftAll";
import Header from "../../../../components/templates/Header/HeaderNext";
import HeaderAtMd from "../../../../components/templates/Header/Header";
import { Box } from "@mui/material";
import { createMedia } from "@artsy/fresnel";
import Title from "../../../../components/atoms/Text/PrimaryTitle";
const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    sm: 0,
    md: 600,
    lg: 990,
    xl: 1200,
  },
});

export default function SpacePage() {
  return (
    <>
      <MediaContextProvider>
        <Media greaterThan="md">
          <Header>
            <Box mt={10}>
              <ShiftsAll />
            </Box>
          </Header>
        </Media>
        <Media at="md">
          <HeaderAtMd />
          <Box mt={3}>
            <ShiftsAll />
          </Box>
        </Media>
        <Media at="sm">
          <Box mt={5} ml={2} mr={2} display="flex">
            <Title>管理者ページは、 スマートフォンでの閲覧はできません</Title>
          </Box>
        </Media>
      </MediaContextProvider>
    </>
  );
}
