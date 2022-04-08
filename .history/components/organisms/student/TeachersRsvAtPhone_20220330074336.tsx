import {
  collection,
  getFirestore,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import Modal from "@mui/material/Modal";
import Table from "@mui/material/Table";
import Tooltip from "@mui/material/Tooltip";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import { browser } from "process";
import Stack from "@mui/material/Stack";
import SnackbarContent from "@mui/material/SnackbarContent";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { blue, grey, red, teal } from "@mui/material/colors";
import { ToastContainer } from "react-toastify";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { createMedia } from "@artsy/fresnel";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
//内部インポート
import SnackComponent2 from "../../atoms/Text/SnackTitle2";
import TableCellComponent4 from "../../atoms/TableCell/TableCell4";
import GetRsv_OK_Cancel from "../../templates/andMore.../GetRsv_OK_Cancel";
import Title_15 from "../../atoms/Text/Title_15";
import { useDate } from "../../../hooks/date/useDate";
import { useAuth } from "../../../hooks/useUserAuth";
import { Users } from "../../../models/Users";
import { useRouter } from "next/router";
import { useTeachersRsv_schedule } from "../../../hooks/student/teachersRsv/useTeachersRsv";
import PrimaryText from "../../atoms/Text/Typography4";

//queryの方を準備
type Query = {
  id: string;
};

//Itemのスタイル
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  backgroundColor: "#FFFFDD",
}));
const Item2 = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
//Modalのスタイル
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
//メディアクエリ設定
const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    sm: 0,
    md: 600,
    lg: 990,
    xl: 1200,
  },
});

export default function TeachersRsv() {
  console.log("講師予約画面");
  const db = getFirestore();
  const router = useRouter();
  const query_ = router.query as Query;
  const { changeDateValue, dateValue, newDateTime } = useDate();
  const { user } = useAuth();
  const {
    rsv,
    loadRsv_Schedule1_X,
    loadRsv_Schedule1_Y,
    loadRsv_Schedule1_Z,
    rsv2,
    loadRsv_Schedule2_X,
    loadRsv_Schedule2_Y,
    loadRsv_Schedule2_Z,
    rsv3,
    loadRsv_Schedule3_X,
    loadRsv_Schedule3_Y,
    loadRsv_Schedule3_Z,
    rsv4,
    loadRsv_Schedule4_X,
    loadRsv_Schedule4_Y,
    loadRsv_Schedule4_Z,
    rsv5,
    loadRsv_Schedule5_X,
    loadRsv_Schedule5_Y,
    loadRsv_Schedule5_Z,
    rsv6,
    loadRsv_Schedule6_X,
    loadRsv_Schedule6_Y,
    loadRsv_Schedule6_Z,
    rsv7,
    loadRsv_Schedule7_X,
    loadRsv_Schedule7_Y,
    loadRsv_Schedule7_Z,
  } = useTeachersRsv_schedule();
  const [test, setTest] = useState("");
  const [i, setI] = useState("");
  const [u, setU] = useState<Users>();
  const [v, setV] = useState("");
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //1週間分の処理
  let today = new Date(dateValue);
  let dy = new Date(dateValue);
  let dy2 = new Date(dateValue);
  let dy3 = new Date(dateValue);
  let dy4 = new Date(dateValue);
  let dy5 = new Date(dateValue);
  let dy6 = new Date(dateValue);
  let dy7 = new Date(dateValue);

  dy.setDate(dy.getDate() + 1);
  dy2.setDate(dy2.getDate() + 2);
  dy3.setDate(dy3.getDate() + 3);
  dy4.setDate(dy4.getDate() + 4);
  dy5.setDate(dy5.getDate() + 5);
  dy6.setDate(dy6.getDate() + 6);

  const y = today.getFullYear();
  const m = today.getMonth();
  const d = today.getDate();
  let xxx = new Date(y, m, d - 7, 12, 0, 0);
  let yyy = new Date(y, m, d + 7, 12, 0, 0);
  let xx = new Date(y, m, d, 12, 0, 0);

  const y2 = dy.getFullYear();
  const m2 = dy.getMonth();
  const d2 = dy.getDate();
  let xxx2 = new Date(y2, m2, d2 - 7, 12, 0, 0);
  let yyy2 = new Date(y2, m2, d2 + 7, 12, 0, 0);
  let xx2 = new Date(y2, m2, d2, 12, 0, 0);

  const y3 = dy2.getFullYear();
  const m3 = dy2.getMonth();
  const d3 = dy2.getDate();
  let xx3 = new Date(y3, m3, d3, 12, 0, 0);
  let xxx3 = new Date(y3, m3, d3 - 7, 12, 0, 0);
  let yyy3 = new Date(y3, m3, d3 + 7, 12, 0, 0);

  const y4 = dy3.getFullYear();
  const m4 = dy3.getMonth();
  const d4 = dy3.getDate();
  let xx4 = new Date(y4, m4, d4, 12, 0, 0);
  let xxx4 = new Date(y4, m4, d4 - 7, 12, 0, 0);
  let yyy4 = new Date(y4, m4, d4 + 7, 12, 0, 0);

  const y5 = dy4.getFullYear();
  const m5 = dy4.getMonth();
  const d5 = dy4.getDate();
  let xx5 = new Date(y5, m5, d5, 12, 0, 0);
  let xxx5 = new Date(y5, m5, d5 - 7, 12, 0, 0);
  let yyy5 = new Date(y5, m5, d5 + 7, 12, 0, 0);

  const y6 = dy5.getFullYear();
  const m6 = dy5.getMonth();
  const d6 = dy5.getDate();
  let xx6 = new Date(y6, m6, d6, 12, 0, 0);
  let xxx6 = new Date(y6, m6, d6 - 7, 12, 0, 0);
  let yyy6 = new Date(y6, m6, d6 + 7, 12, 0, 0);

  const y7 = dy6.getFullYear();
  const m7 = dy6.getMonth();
  const d7 = dy6.getDate();
  let xx7 = new Date(y7, m7, d7, 12, 0, 0);
  let xxx7 = new Date(y7, m7, d7 - 7, 12, 0, 0);
  let yyy7 = new Date(y7, m7, d7 + 7, 12, 0, 0);
  //曜日を配列に（日曜スタート）
  const day_arr = ["日", "月", "火", "水", "木", "金", "土"];
  //時間を配列に（10:00 ~ 18:00）
  const time_arr = [10, 11, 12, 13, 14, 15, 16, 17, 18];
  //collection設定
  function getCollections() {
    const db = getFirestore();
    return {
      db,
      userCollection: collection(db, "users"),
    };
  }
  /**========
   * Firebaseからユーザーを取得
   *========*/
  useEffect(() => {
    if (!process.browser) {
      return;
    }
    if (user === null) {
      return;
    }
    async function loadUser() {
      if (query_.id === undefined) {
        return;
      }
      const { userCollection } = getCollections();
      const userDoc = await getDoc(doc(userCollection, query_.id));
      if (!userDoc.exists()) {
        return;
      }
      const gotUser = userDoc.data() as Users;
      gotUser.id = userDoc.id;
      setU(gotUser);
      setV("成功");
    }
    loadUser();
    if (v == "成功") {
      loadRsv_Schedule1_X(u.userName, xx);
      loadRsv_Schedule2_X(u.userName, xx2);
      loadRsv_Schedule3_X(u.userName, xx3);
      loadRsv_Schedule4_X(u.userName, xx4);
      loadRsv_Schedule5_X(u.userName, xx5);
      loadRsv_Schedule6_X(u.userName, xx6);
      loadRsv_Schedule7_X(u.userName, xx7);
    }
  }, [process, browser, user, query_.id]);

  /**=========
   * 予約登録
   *========*/
  const getRsv = async (e: any) => {
    e.preventDefault();
    await updateDoc(doc(db, "FreeSpace", i), {
      student: user.displayName,
      reserved: true,
      reserverUid: user.uid,
      reserveAt: serverTimestamp(),
    }).then(() => {
      handleClose();
      loadRsv_Schedule1_X(u.userName, xx);
      loadRsv_Schedule2_X(u.userName, xx2);
      loadRsv_Schedule3_X(u.userName, xx3);
      loadRsv_Schedule4_X(u.userName, xx4);
      loadRsv_Schedule5_X(u.userName, xx5);
      loadRsv_Schedule6_X(u.userName, xx6);
      loadRsv_Schedule7_X(u.userName, xx7);
      toast.success("予約を登録しました", {
        position: "bottom-left",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
  };
  return (
    <>
      <React.Fragment>
        <MediaContextProvider>
          <>
            <Media at="sm">
              <Box mt={2} display="flex" justifyContent="center" mx="auto">
                <CardContent
                  style={{
                    width: 300,
                    height: 100,
                    borderWidth: "2px",
                    borderStyle: "solid",
                    borderColor: "#4689FF",
                  }}
                >
                  <Box display="flex" justifyContent="center" mx="auto">
                    <Title_15
                      fontSize={15}
                      style={{ mt: 2 }}
                      color={blue[600]}
                      fontWeight={600}
                      textTitle={"指名スタッフ"}
                    />
                    <Title_15
                      style={{ ml: 2, mt: 2 }}
                      fontSize={15}
                      color="black"
                      textTitle={u && u.userName}
                    />
                    <Box
                      component="img"
                      ml={2}
                      sx={{ height: 50, width: 50, borderRadius: "50%" }}
                      alt={u && u.userName}
                      src={u && u.url}
                    />
                  </Box>
                  <Box display="flex" justifyContent="right">
                    <IconButton onClick={() => router.back()}>
                      <KeyboardReturnIcon
                        sx={{ color: blue[500], fontSize: 20 }}
                      />
                    </IconButton>
                    <Button onClick={() => router.back()}>
                      <PrimaryText
                        size={12}
                        color={blue[600]}
                        textTitle={"条件を変更する"}
                      />
                    </Button>
                  </Box>
                </CardContent>
              </Box>
              <SnackComponent2 snackText={"ご希望の時間帯をお選びください"} />
              <GetRsv_OK_Cancel />
              <Box
                display="flex"
                justifyContent="center"
                mx="auto"
                fontSize={15}
              >
                <IconButton
                  onClick={() => {
                    changeDateValue(dy7.setDate(dy7.getDate() - 7));
                    loadRsv_Schedule1_Y(u.userName, xxx);
                    loadRsv_Schedule2_Y(u.userName, xxx2);
                    loadRsv_Schedule3_Y(u.userName, xxx3);
                    loadRsv_Schedule4_Y(u.userName, xxx4);
                    loadRsv_Schedule5_Y(u.userName, xxx5);
                    loadRsv_Schedule6_Y(u.userName, xxx6);
                    loadRsv_Schedule7_Y(u.userName, xxx7);
                  }}
                >
                  <ArrowLeftIcon
                    sx={{
                      fontSize: 40,
                      color: blue[500],
                    }}
                  />
                  <Typography fontSize={12} component="div" color={blue[600]}>
                    前の週
                  </Typography>
                </IconButton>
                <Box fontSize={15} fontWeight={600} mt={2.5} mx={3}>
                  {`${today.getFullYear()}/${today.getMonth() + 1}`}
                </Box>
                <IconButton
                  onClick={() => {
                    changeDateValue(dy7.setDate(dy7.getDate() + 7));
                    loadRsv_Schedule1_Z(u.userName, yyy);
                    loadRsv_Schedule2_Z(u.userName, yyy2);
                    loadRsv_Schedule3_Z(u.userName, yyy3);
                    loadRsv_Schedule4_Z(u.userName, yyy4);
                    loadRsv_Schedule5_Z(u.userName, yyy5);
                    loadRsv_Schedule6_Z(u.userName, yyy6);
                    loadRsv_Schedule7_Z(u.userName, yyy7);
                  }}
                >
                  <Typography fontSize={12} component="div" color={blue[600]}>
                    次の週
                  </Typography>
                  <ArrowRightIcon
                    sx={{
                      fontSize: 50,
                      color: blue[500],
                      alignItems: "center",
                    }}
                  />
                </IconButton>
              </Box>
              <Box overflow="scroll">
                <Table
                  size="small"
                  sx={{
                    borderCollapse: "collapse",
                    mb: 5,
                    width: 500,
                    mx: "auto",
                  }}
                >
                  <TableHead
                    style={{ backgroundColor: "#FFFFDD", border: "3px" }}
                  >
                    <TableRow>
                      <TableCell
                        style={{
                          width: "8%",
                          borderStyle: "solid none",
                          borderWidth: "1px",
                          borderColor: grey[400],
                        }}
                      />
                      <TableCellComponent4 date={today} />
                      <TableCellComponent4 date={dy} />
                      <TableCellComponent4 date={dy2} />
                      <TableCellComponent4 date={dy3} />
                      <TableCellComponent4 date={dy4} />
                      <TableCellComponent4 date={dy5} />
                      <TableCellComponent4 date={dy6} />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {time_arr.map((t) => (
                      <TableRow key={time_arr.length}>
                        <TableCell>
                          <Box fontSize={10} sx={{ height: 40, width: "8%" }}>
                            <Box>{`${t}:00`}</Box>
                          </Box>
                        </TableCell>
                        <TableCell
                          sx={{
                            borderStyle: "dashed solid",
                            borderWidth: "1px",
                            borderColor: grey[400],
                            bgcolor: grey[200],
                            width: "13%",
                          }}
                        >
                          {rsv &&
                            rsv.map(
                              (i) =>
                                i.time == t && (
                                  <Box
                                    display="flex"
                                    justifyContent="center"
                                    bgcolor={blue[400]}
                                    borderRadius={2}
                                  >
                                    <Tooltip
                                      title={
                                        <>
                                          <Box>{`講師名 : ${
                                            u && u.userName
                                          }`}</Box>{" "}
                                          <Box>{`日付 : ${dayjs(
                                            i.date.toDate()
                                          ).format("YYYY/MM/DD ")}`}</Box>
                                          <Box>{`時間 : ${i.time}:30 ~ ${
                                            i.time + 1
                                          }:30`}</Box>
                                        </>
                                      }
                                      arrow
                                    >
                                      <IconButton
                                        onClick={() => {
                                          handleOpen();
                                          setI(i.id);
                                          setTest(
                                            `${dayjs(i.date.toDate()).format(
                                              "M/D "
                                            )} ${i.time}:30 ~ ${i.time + 1}:30`
                                          );
                                        }}
                                      >
                                        <RadioButtonUncheckedIcon
                                          sx={{
                                            color: "white",
                                            fontSize: 12,
                                          }}
                                        />
                                      </IconButton>
                                    </Tooltip>
                                  </Box>
                                )
                            )}
                        </TableCell>
                        <TableCell
                          sx={{
                            borderStyle: "dashed solid",
                            borderWidth: "1px",
                            borderColor: grey[400],
                            bgcolor: grey[200],
                          }}
                        >
                          {rsv2 &&
                            rsv2.map(
                              (i) =>
                                i.time == t && (
                                  <Box
                                    display="flex"
                                    justifyContent="center"
                                    bgcolor={blue[400]}
                                    borderRadius={2}
                                  >
                                    <Tooltip
                                      title={
                                        <>
                                          <Box>{`講師名 : ${
                                            u && u.userName
                                          }`}</Box>{" "}
                                          <Box>{`日付 : ${dayjs(
                                            i.date.toDate()
                                          ).format("YYYY/MM/DD ")}`}</Box>
                                          <Box>{`時間 : ${i.time}:30 ~ ${
                                            i.time + 1
                                          }:30`}</Box>
                                        </>
                                      }
                                      arrow
                                    >
                                      <IconButton
                                        onClick={() => {
                                          handleOpen();
                                          setI(i.id);
                                          setTest(
                                            `${dayjs(i.date.toDate()).format(
                                              "M/D "
                                            )} ${i.time}:30 ~ ${i.time + 1}:30`
                                          );
                                        }}
                                      >
                                        <RadioButtonUncheckedIcon
                                          sx={{
                                            color: "white",
                                            fontSize: 12,
                                          }}
                                        />
                                      </IconButton>
                                    </Tooltip>
                                  </Box>
                                )
                            )}
                        </TableCell>
                        <TableCell
                          sx={{
                            borderStyle: "dashed solid",
                            borderWidth: "1px",
                            borderColor: grey[400],
                            bgcolor: grey[200],
                          }}
                        >
                          {rsv3 &&
                            rsv3.map(
                              (i) =>
                                i.time == t && (
                                  <Box
                                    display="flex"
                                    justifyContent="center"
                                    bgcolor={blue[400]}
                                    borderRadius={2}
                                  >
                                    <Tooltip
                                      title={
                                        <>
                                          <Box>{`講師名 : ${
                                            u && u.userName
                                          }`}</Box>{" "}
                                          <Box>{`日付 : ${dayjs(
                                            i.date.toDate()
                                          ).format("YYYY/MM/DD ")}`}</Box>
                                          <Box>{`時間 : ${i.time}:30 ~ ${
                                            i.time + 1
                                          }:30`}</Box>
                                        </>
                                      }
                                      arrow
                                    >
                                      <IconButton
                                        onClick={() => {
                                          handleOpen();
                                          setI(i.id);
                                          setTest(
                                            `${dayjs(i.date.toDate()).format(
                                              "M/D "
                                            )} ${i.time}:30 ~ ${i.time + 1}:30`
                                          );
                                        }}
                                      >
                                        <RadioButtonUncheckedIcon
                                          sx={{
                                            color: "white",
                                            fontSize: 12,
                                          }}
                                        />
                                      </IconButton>
                                    </Tooltip>
                                  </Box>
                                )
                            )}
                        </TableCell>
                        <TableCell
                          sx={{
                            borderStyle: "dashed solid",
                            borderWidth: "1px",
                            borderColor: grey[400],
                            bgcolor: grey[200],
                          }}
                        >
                          {rsv4 &&
                            rsv4.map(
                              (i) =>
                                i.time == t && (
                                  <Box
                                    display="flex"
                                    justifyContent="center"
                                    bgcolor={blue[400]}
                                    borderRadius={2}
                                  >
                                    <Tooltip
                                      title={
                                        <>
                                          <Box>{`講師名 : ${u.userName}`}</Box>{" "}
                                          <Box>{`日付 : ${dayjs(
                                            i.date.toDate()
                                          ).format("YYYY/MM/DD ")}`}</Box>
                                          <Box>{`時間 : ${i.time}:30 ~ ${
                                            i.time + 1
                                          }:30`}</Box>
                                        </>
                                      }
                                      arrow
                                    >
                                      <IconButton
                                        onClick={() => {
                                          handleOpen();
                                          setI(i.id);
                                          setTest(
                                            `${dayjs(i.date.toDate()).format(
                                              "M/D "
                                            )} ${i.time}:30 ~ ${i.time + 1}:30`
                                          );
                                        }}
                                      >
                                        <RadioButtonUncheckedIcon
                                          sx={{
                                            color: "white",
                                            fontSize: 12,
                                          }}
                                        />
                                      </IconButton>
                                    </Tooltip>
                                  </Box>
                                )
                            )}
                        </TableCell>
                        <TableCell
                          sx={{
                            borderStyle: "dashed solid",
                            borderWidth: "1px",
                            borderColor: grey[400],
                            bgcolor: grey[200],
                          }}
                        >
                          {rsv5 &&
                            rsv5.map(
                              (i) =>
                                i.time == t && (
                                  <Box
                                    display="flex"
                                    justifyContent="center"
                                    bgcolor={blue[400]}
                                    borderRadius={2}
                                  >
                                    <Tooltip
                                      title={
                                        <>
                                          <Box>{`講師名 : ${
                                            u && u.userName
                                          }`}</Box>{" "}
                                          <Box>{`日付 : ${dayjs(
                                            i.date.toDate()
                                          ).format("YYYY/MM/DD ")}`}</Box>
                                          <Box>{`時間 : ${i.time}:30 ~ ${
                                            i.time + 1
                                          }:30`}</Box>
                                        </>
                                      }
                                      arrow
                                    >
                                      <IconButton
                                        onClick={() => {
                                          handleOpen();
                                          setI(i.id);
                                          setTest(
                                            `${dayjs(i.date.toDate()).format(
                                              "M/D "
                                            )} ${i.time}:30 ~ ${i.time + 1}:30`
                                          );
                                        }}
                                      >
                                        <RadioButtonUncheckedIcon
                                          sx={{
                                            color: "white",
                                            fontSize: 12,
                                          }}
                                        />
                                      </IconButton>
                                    </Tooltip>
                                  </Box>
                                )
                            )}
                        </TableCell>
                        <TableCell
                          sx={{
                            borderStyle: "dashed solid",
                            borderWidth: "1px",
                            borderColor: grey[400],
                            bgcolor: grey[200],
                          }}
                        >
                          {rsv6 &&
                            rsv6.map(
                              (i) =>
                                i.time == t && (
                                  <Box
                                    display="flex"
                                    justifyContent="center"
                                    bgcolor={blue[400]}
                                    borderRadius={2}
                                  >
                                    <Tooltip
                                      title={
                                        <>
                                          <Box>{`講師名 : ${
                                            u && u.userName
                                          }`}</Box>{" "}
                                          <Box>{`日付 : ${dayjs(
                                            i.date.toDate()
                                          ).format("YYYY/MM/DD ")}`}</Box>
                                          <Box>{`時間 : ${i.time}:30 ~ ${
                                            i.time + 1
                                          }:30`}</Box>
                                        </>
                                      }
                                      arrow
                                    >
                                      <IconButton
                                        onClick={() => {
                                          handleOpen();
                                          setI(i.id);
                                          setTest(
                                            `${dayjs(i.date.toDate()).format(
                                              "M/D "
                                            )} ${i.time}:30 ~ ${i.time + 1}:30`
                                          );
                                        }}
                                      >
                                        <RadioButtonUncheckedIcon
                                          sx={{
                                            color: "white",
                                            fontSize: 12,
                                          }}
                                        />
                                      </IconButton>
                                    </Tooltip>
                                  </Box>
                                )
                            )}
                        </TableCell>
                        <TableCell
                          sx={{
                            borderStyle: "dashed solid",
                            borderWidth: "1px",
                            borderColor: grey[400],
                            bgcolor: grey[200],
                          }}
                        >
                          {rsv7 &&
                            rsv7.map(
                              (i) =>
                                i.time == t && (
                                  <Box
                                    display="flex"
                                    justifyContent="center"
                                    bgcolor={blue[400]}
                                    borderRadius={2}
                                  >
                                    <Tooltip
                                      title={
                                        <>
                                          <Box>{`講師名 : ${u.userName}`}</Box>{" "}
                                          <Box>{`日付 : ${dayjs(
                                            i.date.toDate()
                                          ).format("YYYY/MM/DD ")}`}</Box>
                                          <Box>{`時間 : ${i.time}:30 ~ ${
                                            i.time + 1
                                          }:30`}</Box>
                                        </>
                                      }
                                      arrow
                                    >
                                      <IconButton
                                        onClick={() => {
                                          handleOpen();
                                          setI(i.id);
                                          setTest(
                                            `${dayjs(i.date.toDate()).format(
                                              "M/D "
                                            )} ${i.time}:30 ~ ${i.time + 1}:30`
                                          );
                                        }}
                                      >
                                        <RadioButtonUncheckedIcon
                                          sx={{
                                            color: "white",
                                            fontSize: 12,
                                          }}
                                        />
                                      </IconButton>
                                    </Tooltip>
                                  </Box>
                                )
                            )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Media>
          </>
          {/* モーダル予約登録確認画面 */}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Stack spacing={2} sx={{ width: "100%", my: 3, mx: "auto" }}>
                <SnackbarContent
                  sx={{
                    bgcolor: blue[400],
                    justifyContent: "center",
                    boxShadow: "none",
                    fontWeight: 600,
                  }}
                  message={"予約登録確認"}
                />
              </Stack>
              <Box display="flex">
                <Typography
                  variant="h5"
                  component="div"
                  color="black"
                  textAlign="center"
                  mx="auto"
                  fontSize={12}
                  fontWeight={400}
                  mb={3}
                >
                  以下の内容で予約登録します
                </Typography>
              </Box>
              <Item sx={{ my: 2 }}>
                <Box display="flex">
                  <Typography
                    variant="h5"
                    component="div"
                    color="black"
                    textAlign="center"
                    mx="auto"
                    fontSize={14}
                    width={90}
                    fontWeight={500}
                  >
                    予約情報
                  </Typography>
                </Box>
              </Item>
              <Item2 sx={{ my: 2 }}>
                <Box display="flex">
                  <Typography
                    variant="h5"
                    component="div"
                    ml={1}
                    color="black"
                    textAlign="left"
                    fontSize={12}
                    width={90}
                    fontWeight={400}
                  >
                    予約日時
                  </Typography>
                  <Typography
                    variant="h5"
                    component="div"
                    ml={1}
                    color={grey[600]}
                    textAlign="left"
                    fontSize={12}
                  >
                    {test}
                  </Typography>
                </Box>
              </Item2>
              <Item sx={{ my: 2 }}>
                <Box display="flex">
                  <Typography
                    variant="h5"
                    component="div"
                    ml={1}
                    color="black"
                    textAlign="left"
                    fontSize={12}
                    width={90}
                    fontWeight={400}
                  >
                    担当者
                  </Typography>
                  <Typography
                    variant="h5"
                    component="div"
                    ml={1}
                    color={grey[600]}
                    textAlign="left"
                    fontSize={12}
                  >
                    {u && u.userName}
                  </Typography>
                </Box>
              </Item>
              <Item2 sx={{ my: 2 }}>
                <Box display="flex">
                  <Typography
                    variant="h5"
                    component="div"
                    ml={1}
                    color="black"
                    textAlign="left"
                    fontSize={12}
                    width={90}
                    fontWeight={400}
                  >
                    お客様名
                  </Typography>
                  <Typography
                    variant="h5"
                    component="div"
                    ml={1}
                    color={grey[600]}
                    textAlign="left"
                    fontSize={12}
                  >
                    {user && user.displayName}
                  </Typography>
                </Box>
              </Item2>
              <Item sx={{ my: 2 }}>
                <Box display="flex">
                  <Typography
                    variant="h5"
                    component="div"
                    ml={1}
                    color="black"
                    textAlign="left"
                    fontSize={12}
                    width={90}
                    fontWeight={400}
                  >
                    予約状態
                  </Typography>
                  <Typography
                    variant="h5"
                    component="div"
                    ml={1}
                    color={grey[600]}
                    textAlign="left"
                    fontSize={12}
                  >
                    確定
                  </Typography>
                </Box>
              </Item>
              <Box display="flex" justifyContent="right">
                <Button
                  variant="contained"
                  sx={{
                    mt: 1,
                    mb: 2,
                    mr: 1,
                    fontSize: 10,
                    bgcolor: teal[400],
                    color: "white",
                    "&:hover": { bgcolor: teal[500] },
                  }}
                  onClick={(e) => getRsv(e)}
                >
                  予約登録
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    fontSize: 10,
                    mt: 1,
                    mb: 2,
                    mr: 1,
                    bgcolor: grey[500],
                    color: "white",
                    "&:hover": { bgcolor: grey[600] },
                  }}
                  onClick={() => {
                    handleClose();
                  }}
                >
                  キャンセル
                </Button>
              </Box>
            </Box>
          </Modal>
        </MediaContextProvider>
      </React.Fragment>
      <ToastContainer />
    </>
  );
}