import {
  collection,
  getFirestore,
  orderBy,
  query,
  where,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import { browser } from "process";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import Table from "@mui/material/Table";
import IconButton from "@mui/material/IconButton";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import FilterListIcon from "@mui/icons-material/FilterList";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import { TextField } from "@mui/material";
import { useRouter } from "next/router";
//内部インポート
import { useAuth } from "../../../hooks/useUserAuth";
import { FreeList } from "../../../models/FreeList";
import Title from "../../atoms/Title";

//Modalのスタイル
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

//予約一覧ページ　予約済みフラグ(reserved)が true のみ表示　※管理者のみこのページへの遷移が可能
export default function YoyakuList() {
  const [reserves, setReserves] = useState<FreeList[]>([]);
  const { user } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [sortTeacher, setSortTeacher] = useState<string>("");
  const [sortCourse, setSortCourse] = useState<string>("");
  const [err, setErr] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleOpen2 = () => setOpen2(true);
  const handleClose = () => setOpen(false);
  const handleClose2 = () => setOpen2(false);
  //日付をTimeStamp型にして返す
  const timestamp = (datetimeStr: any) => {
    return Timestamp.fromDate(new Date(datetimeStr));
  };
  const day = new Date();
  const y = day.getFullYear();
  const m = day.getMonth();
  const d = day.getDate();
  let xxx = new Date(y, m, d, 12, 0, 0);
  useEffect(() => {
    if (!process.browser) {
      return;
    }
    if (user === null) {
      return;
    }
    /**========
     * Firebaseからシフトを取得
     *========*/
    async function loadReserves() {
      const db = getFirestore();
      const q = query(
        collection(db, "FreeSpace"),
        where("date", ">=", timestamp(xxx)),
        where("student", "==", user.displayName),
        where("reserved", "==", true),
        orderBy("date", "desc"),
        orderBy("time", "asc")
      );
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        return;
      }
      //ReserveList一覧の展開
      const gotReserves = snapshot.docs.map((doc) => {
        const reserve = doc.data() as FreeList;
        reserve.id = doc.id;
        return reserve;
      });
      setReserves(gotReserves);
    }
    loadReserves();
  }, [process, browser, user]);
  /**=======
   * 並び替え
   *=======*/
  const sortReset = async () => {
    const db = getFirestore();
    const q = query(
      collection(db, "FreeSpace"),
      where("student", "==", user.displayName),
      where("reserved", "==", true),
      orderBy("date", "desc"),
      orderBy("time", "asc")
    );
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      return;
    }
    const gotReservers = snapshot.docs.map((doc) => {
      const reserve = doc.data() as FreeList;
      reserve.id = doc.id;
      return reserve;
    });
    setReserves(gotReservers);
  };
  //入力された講師名 & 週目と曜日と時間で並び替え
  const filterTeacher = async () => {
    const db = getFirestore();
    const q = query(
      collection(db, "FreeSpace"),
      where("student", "==", user.displayName),
      orderBy("date", "desc"),
      where("reserved", "==", true),
      where("teacher", "==", sortTeacher),
      orderBy("time", "asc")
    );
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      setErr(true);
    }
    const gotReservers = snapshot.docs.map((doc) => {
      const reserve = doc.data() as FreeList;
      reserve.id = doc.id;
      return reserve;
    });
    setReserves(gotReservers);
  };
  //入力されたコース & 週目と曜日と時間で並び替え
  const filterCourse = async () => {
    const db = getFirestore();
    const q = query(
      collection(db, "FreeSpace"),
      where("student", "==", user.displayName),
      where("reserved", "==", true),
      orderBy("date", "desc"),
      where("course", "==", sortCourse),
      orderBy("time", "asc")
    );
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      setErr(true);
    }
    const gotReservers = snapshot.docs.map((doc) => {
      const reserve = doc.data() as FreeList;
      reserve.id = doc.id;
      return reserve;
    });
    setReserves(gotReservers);
  };
  return (
    <React.Fragment>
      <Box ml={3}>
        <Title>予約一覧ページ</Title>
      </Box>
      <Table size="small">
        <TableHead style={{ backgroundColor: "#FFFFDD" }}>
          <TableRow>
            <TableCell style={{ fontWeight: 600 }}>
              <Box>
                講師名
                <IconButton onClick={handleOpen}>
                  <FilterListIcon />
                </IconButton>
                <IconButton onClick={sortReset}>
                  <RestartAltIcon />
                </IconButton>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Box alignItems="top" m={0}>
                      <IconButton onClick={handleClose}>
                        <CloseIcon />
                      </IconButton>
                    </Box>
                    <Box textAlign="center">
                      <TextField
                        margin="normal"
                        required
                        id="sortTeacher"
                        label="講師名で絞り込み"
                        name="sortTeacher"
                        autoComplete="sortTeacher"
                        autoFocus
                        onChange={(e) => setSortTeacher(e.target.value)}
                      />
                      <Button
                        type="submit"
                        onClick={() => {
                          filterTeacher(), handleClose();
                        }}
                        variant="contained"
                        sx={{ mt: 3, mb: 2, ml: 3 }}
                      >
                        決定
                      </Button>
                    </Box>
                  </Box>
                </Modal>
              </Box>
            </TableCell>
            <TableCell style={{ fontWeight: 600 }}>
              <Box>
                予約日時
                <IconButton onClick={sortReset}>
                  <RestartAltIcon />
                </IconButton>
              </Box>
            </TableCell>
            <TableCell style={{ fontWeight: 600 }}>
              <Box>
                コース
                <IconButton onClick={handleOpen2}>
                  <FilterListIcon />
                </IconButton>
                <IconButton onClick={sortReset}>
                  <RestartAltIcon />
                </IconButton>
                <Modal
                  open={open2}
                  onClose={handleClose2}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Box alignItems="top" m={0}>
                      <IconButton onClick={handleClose2}>
                        <CloseIcon />
                      </IconButton>
                    </Box>
                    <FormControl>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                      >
                        <FormControlLabel
                          value="female"
                          control={<Radio />}
                          checked={sortCourse == "Vo"}
                          onChange={() => setSortCourse("Vo")}
                          label="Vo"
                        />
                        <FormControlLabel
                          value="male"
                          control={<Radio />}
                          checked={sortCourse == "Vi"}
                          onChange={() => setSortCourse("Vi")}
                          label="Vi"
                        />
                        <FormControlLabel
                          value="other"
                          control={<Radio />}
                          checked={sortCourse == "Pf"}
                          onChange={() => setSortCourse("Pf")}
                          label="Pf"
                        />
                        <FormControlLabel
                          value="disabled"
                          control={<Radio />}
                          checked={sortCourse == "Gt"}
                          onChange={() => setSortCourse("Gt")}
                          label="Gt"
                        />
                        <FormControlLabel
                          value="disabled"
                          control={<Radio />}
                          checked={sortCourse == "Ba"}
                          onChange={() => setSortCourse("Ba")}
                          label="Ba"
                        />
                        <FormControlLabel
                          value="disabled"
                          control={<Radio />}
                          checked={sortCourse == "Uk"}
                          onChange={() => setSortCourse("Uk")}
                          label="Uk"
                        />
                        <FormControlLabel
                          value="disabled"
                          control={<Radio />}
                          checked={sortCourse == "DJ"}
                          onChange={() => setSortCourse("DJ")}
                          label="DJ"
                        />
                      </RadioGroup>
                    </FormControl>
                    <Box textAlign="right" mr={5}>
                      <Button
                        type="submit"
                        onClick={() => {
                          filterCourse(), handleClose2();
                        }}
                        variant="contained"
                        sx={{ mt: 3, mb: 2, ml: 3 }}
                      >
                        決定
                      </Button>
                    </Box>
                  </Box>
                </Modal>
              </Box>
            </TableCell>
            <TableCell style={{ fontWeight: 600 }}>時間</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reserves.map((rsv) => (
            <TableRow key={rsv.id}>
              <TableCell>{rsv.teacher}</TableCell>
              <TableCell>
                {dayjs(rsv.date.toDate()).format("YYYY/MM/DD ")}
              </TableCell>
              <TableCell>{rsv.course}</TableCell>
              <TableCell>
                {`${rsv.time}:30`}
                <IconButton onClick={handleOpen}>
                  <FilterListIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {err == true && (
        <Grid xs={12} sm={15}>
          <Alert
            variant="filled"
            severity="error"
            sx={{ m: 3, textAlign: "center" }}
          >
            エラー : 指定した条件では見つかりませんでした
            <Button
              onClick={() => {
                setErr(false), sortReset();
              }}
              size="small"
              sx={{ color: "red", bgcolor: "whitesmoke", m: 1 }}
            >
              了解
            </Button>
          </Alert>
        </Grid>
      )}
    </React.Fragment>
  );
}
