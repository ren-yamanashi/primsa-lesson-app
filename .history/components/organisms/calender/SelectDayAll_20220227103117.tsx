import {
  collection,
  getFirestore,
  query,
  where,
  getDocs,
  Timestamp,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import dayjs from "dayjs";
import Tooltip from "@mui/material/Tooltip";
import React, { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import SearchIcon from "@mui/icons-material/Search";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Modal from "@mui/material/Modal";
import "moment/locale/ja"; // 日本語ローカライズ
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import TextField from "@mui/material/TextField";
//内部インポート
import { Users } from "../../../models/Users";
import { useAuth } from "../../../hooks/useUserAuth";
import { FreeList } from "../../../models/FreeList";
import Title from "../../atoms/Title";
import Header from "../../templates/Header";
import { useRouter } from "next/router";
import { browser } from "process";
import { blue, grey, teal } from "@mui/material/colors";

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

//スケジュール表の作成　全てのスケジュールを参照することができる。
//※ただし、このサイトリンクが表示されるのは名前に「管理者」がつく場合のみ
export default function SelectDayAll() {
  const [users, setUsers] = useState<Users[]>([]);
  const [freeLists, setFreeLists] = useState<FreeList[]>([]);
  const [freeLists10, setFreeLists10] = useState<FreeList[]>([]);
  const [freeLists11, setFreeLists11] = useState<FreeList[]>([]);
  const [freeLists12, setFreeLists12] = useState<FreeList[]>([]);
  const [freeLists13, setFreeLists13] = useState<FreeList[]>([]);
  const [freeLists14, setFreeLists14] = useState<FreeList[]>([]);
  const [freeLists15, setFreeLists15] = useState<FreeList[]>([]);
  const [freeLists16, setFreeLists16] = useState<FreeList[]>([]);
  const [freeLists17, setFreeLists17] = useState<FreeList[]>([]);
  const [freeLists18, setFreeLists18] = useState<FreeList[]>([]);
  const [e10, setE10] = useState(false);
  const [e11, setE11] = useState(false);
  const [e12, setE12] = useState(false);
  const [e13, setE13] = useState(false);
  const [e14, setE14] = useState(false);
  const [e15, setE15] = useState(false);
  const [e16, setE16] = useState(false);
  const [e17, setE17] = useState(false);
  const [e18, setE18] = useState(false);
  const [value, setValue] = useState<Date | null>(new Date());
  const [test, setTest] = useState("");
  const [err, setErr] = useState(false);
  const [open, setOpen] = useState(false);
  const [age, setAge] = React.useState<number | string>("");
  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };
  const day = new Date(value);
  const y = day.getFullYear();
  const m = day.getMonth();
  const d = day.getDate();
  let xxx = new Date(y, m, d, 12, 0, 0);
  const day2 = new Date();
  const y2 = day2.getFullYear();
  const m2 = day2.getMonth();
  const d2 = day2.getDate();
  let xxx2 = new Date(y2, m2, d2, 12, 0, 0);
  const { user } = useAuth();
  const router = useRouter();
  //日付をTimeStamp型にして返す
  const timestamp = (datetimeStr: any) => {
    return Timestamp.fromDate(new Date(datetimeStr));
  };

  useEffect(() => {
    if (!process.browser) {
      return;
    }
    if (user === null) {
      return;
    }
    /**==========
     * Userを取り出す
     *==========*/
    async function loadUsers() {
      const db = getFirestore();
      const q = query(collection(db, "users"), where("role", "==", "teacher"));
      const snapshot = await getDocs(q);
      //FreeList一覧の展開
      const gotUser = snapshot.docs.map((doc) => {
        const free = doc.data() as Users;
        free.id = doc.id;
        return free;
      });
      setUsers(gotUser);
    }
    /**===========
     * 予約情報を取り出す
     *============*/
    async function loadRsv() {
      const db = getFirestore();
      const u = user;
      setTest(u.displayName);
      const q = query(
        collection(db, "FreeSpace"),
        where("date", "==", timestamp(xxx2))
      );
      const snapshot = await getDocs(q);
      //FreeList一覧の展開
      const gotFreeList = snapshot.docs.map((doc) => {
        const free = doc.data() as FreeList;
        free.id = doc.id;
        return free;
      });
      setFreeLists(gotFreeList);
    }
    //10時
    async function loadRsv10() {
      setE10(false);
      const db = getFirestore();
      const q = query(
        collection(db, "FreeSpace"),
        where("date", "==", timestamp(xxx2)),
        where("time", "==", 10)
      );
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        setE10(true);
      }
      //FreeList一覧の展開
      const gotFreeList = snapshot.docs.map((doc) => {
        const free = doc.data() as FreeList;
        free.id = doc.id;
        return free;
      });
      setFreeLists10(gotFreeList);
    }
    //11時
    async function loadRsv11() {
      setE11(false);
      const db = getFirestore();
      const q = query(
        collection(db, "FreeSpace"),
        where("date", "==", timestamp(xxx2)),
        where("time", "==", 11)
      );
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        setE11(true);
      }
      //FreeList一覧の展開
      const gotFreeList = snapshot.docs.map((doc) => {
        const free = doc.data() as FreeList;
        free.id = doc.id;
        return free;
      });
      setFreeLists11(gotFreeList);
    }
    //12時
    async function loadRsv12() {
      setE12(false);
      const db = getFirestore();
      const q = query(
        collection(db, "FreeSpace"),
        where("date", "==", timestamp(xxx2)),
        where("time", "==", 12)
      );
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        setE12(true);
      }
      //FreeList一覧の展開
      const gotFreeList = snapshot.docs.map((doc) => {
        const free = doc.data() as FreeList;
        free.id = doc.id;
        return free;
      });
      setFreeLists12(gotFreeList);
    }
    //13時
    async function loadRsv13() {
      setE13(false);
      const db = getFirestore();
      const q = query(
        collection(db, "FreeSpace"),
        where("date", "==", timestamp(xxx2)),
        where("time", "==", 13)
      );
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        setE13(true);
      }
      //FreeList一覧の展開
      const gotFreeList = snapshot.docs.map((doc) => {
        const free = doc.data() as FreeList;
        free.id = doc.id;
        return free;
      });
      setFreeLists13(gotFreeList);
    }
    //14時
    async function loadRsv14() {
      setE14(false);
      const db = getFirestore();
      const q = query(
        collection(db, "FreeSpace"),
        where("date", "==", timestamp(xxx2)),
        where("time", "==", 14)
      );
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        setE14(true);
      }
      //FreeList一覧の展開
      const gotFreeList = snapshot.docs.map((doc) => {
        const free = doc.data() as FreeList;
        free.id = doc.id;
        return free;
      });
      setFreeLists14(gotFreeList);
    }
    //15時
    async function loadRsv15() {
      setE15(false);
      const db = getFirestore();
      const q = query(
        collection(db, "FreeSpace"),
        where("date", "==", timestamp(xxx2)),
        where("time", "==", 15)
      );
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        setE15(true);
      }
      //FreeList一覧の展開
      const gotFreeList = snapshot.docs.map((doc) => {
        const free = doc.data() as FreeList;
        free.id = doc.id;
        return free;
      });
      setFreeLists15(gotFreeList);
    }
    //16時
    async function loadRsv16() {
      setE16(false);
      const db = getFirestore();
      const q = query(
        collection(db, "FreeSpace"),
        where("date", "==", timestamp(xxx2)),
        where("time", "==", 16)
      );
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        setE16(true);
      }
      //FreeList一覧の展開
      const gotFreeList = snapshot.docs.map((doc) => {
        const free = doc.data() as FreeList;
        free.id = doc.id;
        return free;
      });
      setFreeLists16(gotFreeList);
    }
    //17時
    async function loadRsv17() {
      setE17(false);
      const db = getFirestore();
      const q = query(
        collection(db, "FreeSpace"),
        where("date", "==", timestamp(xxx2)),
        where("time", "==", 17)
      );
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        setE17(true);
      }
      //FreeList一覧の展開
      const gotFreeList = snapshot.docs.map((doc) => {
        const free = doc.data() as FreeList;
        free.id = doc.id;
        return free;
      });
      setFreeLists17(gotFreeList);
    }
    //18時
    async function loadRsv18() {
      setE18(false);
      const db = getFirestore();
      const q = query(
        collection(db, "FreeSpace"),
        where("date", "==", timestamp(xxx2)),
        where("time", "==", 18)
      );
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        setE18(true);
      }
      //FreeList一覧の展開
      const gotFreeList = snapshot.docs.map((doc) => {
        const free = doc.data() as FreeList;
        free.id = doc.id;
        return free;
      });
      setFreeLists18(gotFreeList);
    }
    loadUsers();
    loadRsv();
    loadRsv10();
    loadRsv11();
    loadRsv12();
    loadRsv13();
    loadRsv14();
    loadRsv15();
    loadRsv16();
    loadRsv17();
    loadRsv18();
  }, [process, browser, user]);
  /**==========
   * シフト登録
   *==========*/
  const createShift = async (e: any) => {
    setErr(false);
    const db = getFirestore();
    const q = query(
      collection(db, "FreeSpace"),
      where("teacher", "==", test),
      where("time", "==", age),
      where("date", "==", timestamp(xxx))
    );
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      e.preventDefault();
      await addDoc(collection(db, "FreeSpace"), {
        teacher: test,
        student: "",
        date: timestamp(xxx),
        reserved: false,
        completed: false,
        time: age,
        createAt: serverTimestamp(),
        senderUid: user.uid,
      });
      router.reload();
    } else {
      setErr(true);
      return;
    }
  };
  return (
    <>
      <React.Fragment>
        <Box ml={3}>
          <Title>予約スケジュール</Title>
        </Box>
        <Box
          ml={5}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={2}
        >
          <Box mr={5}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="日付を選択"
                value={value}
                onChange={async (newValue) => {
                  console.log(newValue);
                  setValue(newValue);
                  const day3 = new Date(newValue);
                  const y3 = day3.getFullYear();
                  const m3 = day3.getMonth();
                  const d3 = day3.getDate();
                  let xxx = new Date(y3, m3, d3, 12, 0, 0);
                  const db = getFirestore();
                  const q = query(
                    collection(db, "FreeSpace"),
                    where("date", "==", timestamp(xxx))
                  );
                  const snapshot = await getDocs(q);
                  //FreeList一覧の展開
                  const gotFreeList = snapshot.docs.map((doc) => {
                    const free = doc.data() as FreeList;
                    free.id = doc.id;
                    return free;
                  });
                  setFreeLists(gotFreeList);
                  async function loadRsv() {
                    const db = getFirestore();
                    const u = user;
                    setTest(u.displayName);
                    const q = query(
                      collection(db, "FreeSpace"),
                      where("date", "==", timestamp(xxx))
                    );
                    const snapshot = await getDocs(q);
                    //FreeList一覧の展開
                    const gotFreeList = snapshot.docs.map((doc) => {
                      const free = doc.data() as FreeList;
                      free.id = doc.id;
                      return free;
                    });
                    setFreeLists(gotFreeList);
                  }
                  //10時
                  async function loadRsv10() {
                    setE10(false);
                    const db = getFirestore();
                    const q = query(
                      collection(db, "FreeSpace"),
                      where("date", "==", timestamp(xxx)),
                      where("time", "==", 10)
                    );
                    const snapshot = await getDocs(q);
                    if (snapshot.empty) {
                      setE10(true);
                    }
                    //FreeList一覧の展開
                    const gotFreeList = snapshot.docs.map((doc) => {
                      const free = doc.data() as FreeList;
                      free.id = doc.id;
                      return free;
                    });
                    setFreeLists10(gotFreeList);
                  }
                  //11時
                  async function loadRsv11() {
                    setE11(false);
                    const db = getFirestore();
                    const q = query(
                      collection(db, "FreeSpace"),
                      where("date", "==", timestamp(xxx)),
                      where("time", "==", 11)
                    );
                    const snapshot = await getDocs(q);
                    if (snapshot.empty) {
                      setE11(true);
                    }
                    //FreeList一覧の展開
                    const gotFreeList = snapshot.docs.map((doc) => {
                      const free = doc.data() as FreeList;
                      free.id = doc.id;
                      return free;
                    });
                    setFreeLists11(gotFreeList);
                  }
                  //12時
                  async function loadRsv12() {
                    setE12(false);
                    const db = getFirestore();
                    const q = query(
                      collection(db, "FreeSpace"),
                      where("date", "==", timestamp(xxx)),
                      where("time", "==", 12)
                    );
                    const snapshot = await getDocs(q);
                    if (snapshot.empty) {
                      setE12(true);
                    }
                    //FreeList一覧の展開
                    const gotFreeList = snapshot.docs.map((doc) => {
                      const free = doc.data() as FreeList;
                      free.id = doc.id;
                      return free;
                    });
                    setFreeLists12(gotFreeList);
                  }
                  //13時
                  async function loadRsv13() {
                    setE13(false);
                    const db = getFirestore();
                    const q = query(
                      collection(db, "FreeSpace"),
                      where("date", "==", timestamp(xxx)),
                      where("time", "==", 13)
                    );
                    const snapshot = await getDocs(q);
                    if (snapshot.empty) {
                      setE13(true);
                    }
                    //FreeList一覧の展開
                    const gotFreeList = snapshot.docs.map((doc) => {
                      const free = doc.data() as FreeList;
                      free.id = doc.id;
                      return free;
                    });
                    setFreeLists13(gotFreeList);
                  }
                  //14時
                  async function loadRsv14() {
                    setE14(false);
                    const db = getFirestore();
                    const q = query(
                      collection(db, "FreeSpace"),
                      where("date", "==", timestamp(xxx)),
                      where("time", "==", 14)
                    );
                    const snapshot = await getDocs(q);
                    if (snapshot.empty) {
                      setE14(true);
                    }
                    //FreeList一覧の展開
                    const gotFreeList = snapshot.docs.map((doc) => {
                      const free = doc.data() as FreeList;
                      free.id = doc.id;
                      return free;
                    });
                    setFreeLists14(gotFreeList);
                  }
                  //15時
                  async function loadRsv15() {
                    setE15(false);
                    const db = getFirestore();
                    const q = query(
                      collection(db, "FreeSpace"),
                      where("date", "==", timestamp(xxx)),
                      where("time", "==", 15)
                    );
                    const snapshot = await getDocs(q);
                    if (snapshot.empty) {
                      setE15(true);
                    }
                    //FreeList一覧の展開
                    const gotFreeList = snapshot.docs.map((doc) => {
                      const free = doc.data() as FreeList;
                      free.id = doc.id;
                      return free;
                    });
                    setFreeLists15(gotFreeList);
                  }
                  //16時
                  async function loadRsv16() {
                    setE16(false);
                    const db = getFirestore();
                    const q = query(
                      collection(db, "FreeSpace"),
                      where("date", "==", timestamp(xxx)),
                      where("time", "==", 16)
                    );
                    const snapshot = await getDocs(q);
                    if (snapshot.empty) {
                      setE16(true);
                    }
                    //FreeList一覧の展開
                    const gotFreeList = snapshot.docs.map((doc) => {
                      const free = doc.data() as FreeList;
                      free.id = doc.id;
                      return free;
                    });
                    setFreeLists16(gotFreeList);
                  }
                  //17時
                  async function loadRsv17() {
                    setE17(false);
                    const db = getFirestore();
                    const q = query(
                      collection(db, "FreeSpace"),
                      where("date", "==", timestamp(xxx)),
                      where("time", "==", 17)
                    );
                    const snapshot = await getDocs(q);
                    if (snapshot.empty) {
                      setE17(true);
                    }
                    //FreeList一覧の展開
                    const gotFreeList = snapshot.docs.map((doc) => {
                      const free = doc.data() as FreeList;
                      free.id = doc.id;
                      return free;
                    });
                    setFreeLists17(gotFreeList);
                  }
                  //18時
                  async function loadRsv18() {
                    setE18(false);
                    const db = getFirestore();
                    const q = query(
                      collection(db, "FreeSpace"),
                      where("date", "==", timestamp(xxx)),
                      where("time", "==", 18)
                    );
                    const snapshot = await getDocs(q);
                    if (snapshot.empty) {
                      setE18(true);
                    }
                    //FreeList一覧の展開
                    const gotFreeList = snapshot.docs.map((doc) => {
                      const free = doc.data() as FreeList;
                      free.id = doc.id;
                      return free;
                    });
                    setFreeLists18(gotFreeList);
                  }
                  loadRsv(),
                    loadRsv10(),
                    loadRsv11(),
                    loadRsv12(),
                    loadRsv13(),
                    loadRsv14(),
                    loadRsv15(),
                    loadRsv16(),
                    loadRsv17(),
                    loadRsv18();
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Box>
        </Box>

        <Table size="small" sx={{ my: 3 }}>
          <TableHead style={{ backgroundColor: "#FFFFDD", borderWidth: "2px" }}>
            <TableRow>
              <TableCell style={{ fontWeight: 600, width: "15%" }}>
                講師名
              </TableCell>
              <TableCell style={{ fontWeight: 600 }}>10:30</TableCell>
              <TableCell style={{ fontWeight: 600 }}>11:30</TableCell>
              <TableCell style={{ fontWeight: 600 }}>12:30</TableCell>
              <TableCell style={{ fontWeight: 600 }}>13:30</TableCell>
              <TableCell style={{ fontWeight: 600 }}>14:30</TableCell>
              <TableCell style={{ fontWeight: 600 }}>15:30</TableCell>
              <TableCell style={{ fontWeight: 600 }}>16:30</TableCell>
              <TableCell style={{ fontWeight: 600 }}>17:30</TableCell>
              <TableCell style={{ fontWeight: 600 }}>18:30</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((uu) => (
              <TableRow key={uu.id}>
                <TableCell style={{ fontWeight: 600 }}>{uu.userName}</TableCell>
                {e10 == true && (
                  <Tooltip title="シフトを申請" arrow>
                    <TableCell
                      sx={{
                        bgcolor: grey[300],
                        cursor: "pointer",
                        borderStyle: "dashed",
                        borderWidth: "1px",
                        height: 50,
                      }}
                      onClick={() => {
                        setOpen(true);
                        setAge(10);
                      }}
                    />
                  </Tooltip>
                )}

                {freeLists10.map((value) =>
                  value.teacher == uu.userName && value.student !== "" ? (
                    <Tooltip
                      title={
                        <>
                          <Box>{`講師名:${value.teacher}`}</Box>
                          <Box>{`生徒名:${value.student}`}</Box>
                          <Box>{`レッスン日時:${dayjs(
                            value.date.toDate()
                          ).format("YYYY/MM/DD ")} ${value.time}:30`}</Box>
                        </>
                      }
                      arrow
                    >
                      <TableCell
                        key={value.id}
                        sx={{
                          bgcolor: teal[300],
                          cursor: "pointer",
                          borderStyle: "dashed",
                          borderWidth: "1px",
                          height: 50,
                        }}
                        onClick={() => router.push(`/reserve/edit/${value.id}`)}
                      />
                    </Tooltip>
                  ) : (
                    <Tooltip
                      title={
                        <>
                          <Box>クリックして予約</Box>
                          <Box>{`レッスン日時:${dayjs(
                            value.date.toDate()
                          ).format("YYYY/MM/DD ")} ${value.time}:30`}</Box>
                        </>
                      }
                      arrow
                    >
                      <TableCell
                        key={value.id}
                        sx={{
                          bgcolor: "white",
                          cursor: "pointer",
                          borderStyle: "dashed",
                          borderWidth: "1px",
                          height: 50,
                        }}
                        onClick={() => router.push(`/reserve/add/${value.id}`)}
                      ></TableCell>
                    </Tooltip>
                  )
                )}

                {e11 == true && (
                  <Tooltip title="シフトを申請" arrow>
                    <TableCell
                      sx={{
                        bgcolor: grey[300],
                        cursor: "pointer",
                        borderStyle: "dashed",
                        borderWidth: "1px",
                        height: 50,
                      }}
                      onClick={() => {
                        setOpen(true);
                        setAge(11);
                      }}
                    />
                  </Tooltip>
                )}
                {freeLists11.map((value) =>
                  value.teacher == uu.userName && value.student !== "" ? (
                    <Tooltip
                      title={
                        <>
                          <Box>{`講師名:${value.teacher}`}</Box>
                          <Box>{`生徒名:${value.student}`}</Box>
                          <Box>{`レッスン日時:${dayjs(
                            value.date.toDate()
                          ).format("YYYY/MM/DD ")} ${value.time}:30`}</Box>
                        </>
                      }
                      arrow
                    >
                      <TableCell
                        key={value.id}
                        sx={{
                          bgcolor: teal[300],
                          cursor: "pointer",
                          borderStyle: "dashed",
                          borderWidth: "1px",
                          height: 50,
                        }}
                        onClick={() => router.push(`/reserve/edit/${value.id}`)}
                      />
                    </Tooltip>
                  ) : (
                    <Tooltip
                      title={
                        <>
                          <Box>クリックして予約</Box>
                          <Box>{`レッスン日時:${dayjs(
                            value.date.toDate()
                          ).format("YYYY/MM/DD ")} ${value.time}:30`}</Box>
                        </>
                      }
                      arrow
                    >
                      <TableCell
                        key={value.id}
                        sx={{
                          bgcolor: "white",
                          cursor: "pointer",
                          borderStyle: "dashed",
                          borderWidth: "1px",
                          height: 50,
                        }}
                        onClick={() => router.push(`/reserve/add/${value.id}`)}
                      ></TableCell>
                    </Tooltip>
                  )
                )}
                {e12 == true && (
                  <Tooltip title="シフトを申請" arrow>
                    <TableCell
                      sx={{
                        bgcolor: grey[300],
                        cursor: "pointer",
                        borderStyle: "dashed",
                        borderWidth: "1px",
                        height: 50,
                      }}
                      onClick={() => {
                        setOpen(true);
                        setAge(12);
                      }}
                    />
                  </Tooltip>
                )}
                {freeLists12.map((value) =>
                  value.teacher == uu.userName && value.student !== "" ? (
                    <Tooltip
                      title={
                        <>
                          <Box>{`講師名:${value.teacher}`}</Box>
                          <Box>{`生徒名:${value.student}`}</Box>
                          <Box>{`レッスン日時:${dayjs(
                            value.date.toDate()
                          ).format("YYYY/MM/DD ")} ${value.time}:30`}</Box>
                        </>
                      }
                      arrow
                    >
                      <TableCell
                        key={value.id}
                        sx={{
                          bgcolor: teal[300],
                          cursor: "pointer",
                          borderStyle: "dashed",
                          borderWidth: "1px",
                          height: 50,
                        }}
                        onClick={() => router.push(`/reserve/edit/${value.id}`)}
                      />
                    </Tooltip>
                  ) : (
                    <Tooltip
                      title={
                        <>
                          <Box>クリックして予約</Box>
                          <Box>{`レッスン日時:${dayjs(
                            value.date.toDate()
                          ).format("YYYY/MM/DD ")} ${value.time}:30`}</Box>
                        </>
                      }
                      arrow
                    >
                      <TableCell
                        key={value.id}
                        sx={{
                          bgcolor: "white",
                          cursor: "pointer",
                          borderStyle: "dashed",
                          borderWidth: "1px",
                          height: 50,
                        }}
                        onClick={() => router.push(`/reserve/add/${value.id}`)}
                      ></TableCell>
                    </Tooltip>
                  )
                )}
                {e13 == true && (
                  <Tooltip title="シフトを申請" arrow>
                    <TableCell
                      sx={{
                        bgcolor: grey[300],
                        cursor: "pointer",
                        borderStyle: "dashed",
                        borderWidth: "1px",
                        height: 50,
                      }}
                      onClick={() => {
                        setOpen(true);
                        setAge(13);
                      }}
                    />
                  </Tooltip>
                )}
                {freeLists13.map((value) =>
                  value.teacher == uu.userName && value.student !== "" ? (
                    <Tooltip
                      title={
                        <>
                          <Box>{`講師名:${value.teacher}`}</Box>
                          <Box>{`生徒名:${value.student}`}</Box>
                          <Box>{`レッスン日時:${dayjs(
                            value.date.toDate()
                          ).format("YYYY/MM/DD ")} ${value.time}:30`}</Box>
                        </>
                      }
                      arrow
                    >
                      <TableCell
                        key={value.id}
                        sx={{
                          bgcolor: teal[300],
                          cursor: "pointer",
                          borderStyle: "dashed",
                          borderWidth: "1px",
                          height: 50,
                        }}
                        onClick={() => router.push(`/reserve/edit/${value.id}`)}
                      />
                    </Tooltip>
                  ) : (
                    <Tooltip
                      title={
                        <>
                          <Box>クリックして予約</Box>
                          <Box>{`レッスン日時:${dayjs(
                            value.date.toDate()
                          ).format("YYYY/MM/DD ")} ${value.time}:30`}</Box>
                        </>
                      }
                      arrow
                    >
                      <TableCell
                        key={value.id}
                        sx={{
                          bgcolor: "white",
                          cursor: "pointer",
                          borderStyle: "dashed",
                          borderWidth: "1px",
                          height: 50,
                        }}
                        onClick={() => router.push(`/reserve/add/${value.id}`)}
                      ></TableCell>
                    </Tooltip>
                  )
                )}
                {e14 == true && (
                  <Tooltip title="シフトを申請" arrow>
                    <TableCell
                      sx={{
                        bgcolor: grey[300],
                        cursor: "pointer",
                        borderStyle: "dashed",
                        borderWidth: "1px",
                        height: 50,
                      }}
                      onClick={() => {
                        setOpen(true);
                        setAge(14);
                      }}
                    />
                  </Tooltip>
                )}
                {freeLists14.map((value) =>
                  value.teacher == uu.userName && value.student !== "" ? (
                    <Tooltip
                      title={
                        <>
                          <Box>{`講師名:${value.teacher}`}</Box>
                          <Box>{`生徒名:${value.student}`}</Box>
                          <Box>{`レッスン日時:${dayjs(
                            value.date.toDate()
                          ).format("YYYY/MM/DD ")} ${value.time}:30`}</Box>
                        </>
                      }
                      arrow
                    >
                      <TableCell
                        key={value.id}
                        sx={{
                          bgcolor: teal[300],
                          cursor: "pointer",
                          borderStyle: "dashed",
                          borderWidth: "1px",
                          height: 50,
                        }}
                        onClick={() => router.push(`/reserve/edit/${value.id}`)}
                      />
                    </Tooltip>
                  ) : (
                    <Tooltip
                      title={
                        <>
                          <Box>クリックして予約</Box>
                          <Box>{`レッスン日時:${dayjs(
                            value.date.toDate()
                          ).format("YYYY/MM/DD ")} ${value.time}:30`}</Box>
                        </>
                      }
                      arrow
                    >
                      <TableCell
                        key={value.id}
                        sx={{
                          bgcolor: "white",
                          cursor: "pointer",
                          borderStyle: "dashed",
                          borderWidth: "1px",
                          height: 50,
                        }}
                        onClick={() => router.push(`/reserve/add/${value.id}`)}
                      ></TableCell>
                    </Tooltip>
                  )
                )}
                {e15 == true && (
                  <Tooltip title="シフトを申請" arrow>
                    <TableCell
                      sx={{
                        bgcolor: grey[300],
                        cursor: "pointer",
                        borderStyle: "dashed",
                        borderWidth: "1px",
                        height: 50,
                      }}
                      onClick={() => {
                        setOpen(true);
                        setAge(15);
                      }}
                    />
                  </Tooltip>
                )}
                {freeLists15.map((value) =>
                  value.teacher == uu.userName && value.student !== "" ? (
                    <Tooltip
                      title={
                        <>
                          <Box>{`講師名:${value.teacher}`}</Box>
                          <Box>{`生徒名:${value.student}`}</Box>
                          <Box>{`レッスン日時:${dayjs(
                            value.date.toDate()
                          ).format("YYYY/MM/DD ")} ${value.time}:30`}</Box>
                        </>
                      }
                      arrow
                    >
                      <TableCell
                        key={value.id}
                        sx={{
                          bgcolor: teal[300],
                          cursor: "pointer",
                          borderStyle: "dashed",
                          borderWidth: "1px",
                          height: 50,
                        }}
                        onClick={() => router.push(`/reserve/edit/${value.id}`)}
                      />
                    </Tooltip>
                  ) : (
                    <Tooltip
                      title={
                        <>
                          <Box>クリックして予約</Box>
                          <Box>{`レッスン日時:${dayjs(
                            value.date.toDate()
                          ).format("YYYY/MM/DD ")} ${value.time}:30`}</Box>
                        </>
                      }
                      arrow
                    >
                      <TableCell
                        key={value.id}
                        sx={{
                          bgcolor: "white",
                          cursor: "pointer",
                          borderStyle: "dashed",
                          borderWidth: "1px",
                          height: 50,
                        }}
                        onClick={() => router.push(`/reserve/add/${value.id}`)}
                      ></TableCell>
                    </Tooltip>
                  )
                )}
                {e16 == true && (
                  <Tooltip title="シフトを申請" arrow>
                    <TableCell
                      sx={{
                        bgcolor: grey[300],
                        cursor: "pointer",
                        borderStyle: "dashed",
                        borderWidth: "1px",
                        height: 50,
                      }}
                      onClick={() => {
                        setOpen(true);
                        setAge(16);
                      }}
                    />
                  </Tooltip>
                )}
                {freeLists16.map((value) =>
                  value.teacher == uu.userName && value.student !== "" ? (
                    <Tooltip
                      title={
                        <>
                          <Box>{`講師名:${value.teacher}`}</Box>
                          <Box>{`生徒名:${value.student}`}</Box>
                          <Box>{`レッスン日時:${dayjs(
                            value.date.toDate()
                          ).format("YYYY/MM/DD ")} ${value.time}:30`}</Box>
                        </>
                      }
                      arrow
                    >
                      <TableCell
                        key={value.id}
                        sx={{
                          bgcolor: teal[300],
                          cursor: "pointer",
                          borderStyle: "dashed",
                          borderWidth: "1px",
                          height: 50,
                        }}
                        onClick={() => router.push(`/reserve/edit/${value.id}`)}
                      />
                    </Tooltip>
                  ) : (
                    <Tooltip
                      title={
                        <>
                          <Box>クリックして予約</Box>
                          <Box>{`レッスン日時:${dayjs(
                            value.date.toDate()
                          ).format("YYYY/MM/DD ")} ${value.time}:30`}</Box>
                        </>
                      }
                      arrow
                    >
                      <TableCell
                        key={value.id}
                        sx={{
                          bgcolor: "white",
                          cursor: "pointer",
                          borderStyle: "dashed",
                          borderWidth: "1px",
                          height: 50,
                        }}
                        onClick={() => router.push(`/reserve/add/${value.id}`)}
                      ></TableCell>
                    </Tooltip>
                  )
                )}

                {e17 == true && (
                  <Tooltip title="シフトを申請" arrow>
                    <TableCell
                      sx={{
                        bgcolor: grey[300],
                        cursor: "pointer",
                        borderStyle: "dashed",
                        borderWidth: "1px",
                        height: 50,
                      }}
                      onClick={() => {
                        setOpen(true);
                        setAge(17);
                      }}
                    />
                  </Tooltip>
                )}
                {freeLists17.map((value) =>
                  value.teacher == uu.userName && value.student !== "" ? (
                    <Tooltip
                      title={
                        <>
                          <Box>{`講師名:${value.teacher}`}</Box>
                          <Box>{`生徒名:${value.student}`}</Box>
                          <Box>{`レッスン日時:${dayjs(
                            value.date.toDate()
                          ).format("YYYY/MM/DD ")} ${value.time}:30`}</Box>
                        </>
                      }
                      arrow
                    >
                      <TableCell
                        key={value.id}
                        sx={{
                          bgcolor: teal[300],
                          cursor: "pointer",
                          borderStyle: "dashed",
                          borderWidth: "1px",
                          height: 50,
                        }}
                        onClick={() => router.push(`/reserve/edit/${value.id}`)}
                      />
                    </Tooltip>
                  ) : (
                    <Tooltip
                      title={
                        <>
                          <Box>クリックして予約</Box>
                          <Box>{`レッスン日時:${dayjs(
                            value.date.toDate()
                          ).format("YYYY/MM/DD ")} ${value.time}:30`}</Box>
                        </>
                      }
                      arrow
                    >
                      <TableCell
                        key={value.id}
                        sx={{
                          bgcolor: "white",
                          cursor: "pointer",
                          borderStyle: "dashed",
                          borderWidth: "1px",
                          height: 50,
                        }}
                        onClick={() => router.push(`/reserve/add/${value.id}`)}
                      ></TableCell>
                    </Tooltip>
                  )
                )}
                {e18 == true && (
                  <Tooltip title="シフトを申請" arrow>
                    <TableCell
                      sx={{
                        bgcolor: grey[300],
                        cursor: "pointer",
                        borderStyle: "dashed",
                        borderWidth: "1px",
                        height: 50,
                      }}
                      onClick={() => {
                        setOpen(true);
                        setAge(18);
                      }}
                    />
                  </Tooltip>
                )}
                {freeLists18.map((value) =>
                  value.teacher == uu.userName && value.student !== "" ? (
                    <Tooltip
                      title={
                        <>
                          <Box>{`講師名:${value.teacher}`}</Box>
                          <Box>{`生徒名:${value.student}`}</Box>
                          <Box>{`レッスン日時:${dayjs(
                            value.date.toDate()
                          ).format("YYYY/MM/DD ")} ${value.time}:30`}</Box>
                        </>
                      }
                      arrow
                    >
                      <TableCell
                        key={value.id}
                        sx={{
                          bgcolor: teal[300],
                          cursor: "pointer",
                          borderStyle: "dashed",
                          borderWidth: "1px",
                          height: 50,
                        }}
                        onClick={() => router.push(`/reserve/edit/${value.id}`)}
                      />
                    </Tooltip>
                  ) : (
                    <Tooltip
                      title={
                        <>
                          <Box>クリックして予約</Box>
                          <Box>{`レッスン日時:${dayjs(
                            value.date.toDate()
                          ).format("YYYY/MM/DD ")} ${value.time}:30`}</Box>
                        </>
                      }
                      arrow
                    >
                      <TableCell
                        key={value.id}
                        sx={{
                          bgcolor: "white",
                          cursor: "pointer",
                          borderStyle: "dashed",
                          borderWidth: "1px",
                          height: 50,
                        }}
                        onClick={() => router.push(`/reserve/add/${value.id}`)}
                      ></TableCell>
                    </Tooltip>
                  )
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Box alignItems="top" m={0}>
              <IconButton onClick={() => setOpen(false)}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Box textAlign="center">
              <Typography
                sx={{ fontSize: 20 }}
                color="text.secondary"
                gutterBottom
              >
                以下の内容でシフト登録します
              </Typography>
              <Box>
                <FormControl sx={{ m: 1, minWidth: 80 }}>
                  <InputLabel id="demo-simple-select-autowidth-label">
                    開始時間
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={age}
                    onChange={handleChange}
                    autoWidth
                    label="時間"
                  >
                    <MenuItem value={10}>10:30</MenuItem>
                    <MenuItem value={11}>11:30</MenuItem>
                    <MenuItem value={12}>12:30</MenuItem>
                    <MenuItem value={13}>13:30</MenuItem>
                    <MenuItem value={14}>14:30</MenuItem>
                    <MenuItem value={15}>15:30</MenuItem>
                    <MenuItem value={16}>16:30</MenuItem>
                    <MenuItem value={17}>17:30</MenuItem>
                    <MenuItem value={18}>18:30</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Button
                type="submit"
                onClick={createShift}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                登録
              </Button>
            </Box>
          </Box>
        </Modal>
      </React.Fragment>
    </>
  );
}
