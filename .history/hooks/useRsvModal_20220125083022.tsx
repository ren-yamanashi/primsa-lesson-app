import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  runTransaction,
} from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import ReactModal from "react-modal";
import { useModal, ModalProvider } from "react-modal-hook";
import React, { useState, useEffect, FormEvent, useCallback } from "react";
//内部インポート
import { useAuth } from "./useUserAuth";
import { FreeList } from "../models/FreeList";
//queryの方を準備
type Query = {
  id: string;
};

ReactModal.setAppElement("#app"); // これがないと警告が出る

const UseRsvModal = () => {
  const router = useRouter();
  const query = router.query as Query;
  const [reserves, setReserves] = useState<FreeList>();
  //フォームの入力内容をステートに保管
  const { user } = useAuth();
  const [student, setStudent] = useState("");
  const [course, setCourse] = useState("");
  const [reserved, setReserved] = useState<boolean>(false);
  //collection設定
  function getCollections() {
    const db = getFirestore();
    return {
      db,
      reserveCollection: collection(db, "FreeSpace"),
    };
  }
  /**================
   * Firebaseからシフトを取り出す
   *===============*/
  async function loadReserve() {
    if (query.id === undefined) {
      return;
    }
    const { reserveCollection } = getCollections();
    const reserveDoc = await getDoc(doc(reserveCollection, query.id)); //idを取り出す
    if (!reserveDoc.exists()) {
      return;
    }
    const gotReserve = reserveDoc.data() as FreeList;
    gotReserve.id = reserveDoc.id;
    if (gotReserve.student !== "") {
      setReserved(true);
    }
    setReserves(gotReserve);
  }
  /**==========
   * 予約登録
   *==========*/
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { db, reserveCollection } = getCollections();
    const reserveRef = doc(reserveCollection);
    await runTransaction(db, async (t: any) => {
      t.update(doc(reserveCollection, reserves.id), {
        student,
        course,
        reserved: true,
      });
    });
    setStudent("");
    setCourse("");
    router.push(`/shift/${user?.uid}`);
  }
  useEffect(() => {
    loadReserve();
  }, [query.id]);

  const [showModal, hideModal] = useModal(() => (
    <>
      <ReactModal isOpen>
        <p>Modal content</p>
        <>
          <React.Fragment>
            <Box textAlign="center" mb={10}>
              <Typography variant="h6" gutterBottom>
                予約登録
              </Typography>
            </Box>
            <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 1 }}>
              <Box sx={{ mt: 1 }} width="30vw" margin="auto">
                <TextField
                  margin="normal"
                  required
                  id="studentName"
                  name="studentName"
                  label="生徒名"
                  fullWidth
                  autoComplete="studentName"
                  variant="standard"
                  onChange={(e) => setStudent(e.target.value)}
                />
              </Box>
              <Box sx={{ mt: 1 }} width="30vw" margin="auto">
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    コース
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      value="Vo"
                      control={<Radio />}
                      checked={course == "Vo"}
                      onChange={() => setCourse("Vo")}
                      label="Vo"
                    />
                    <FormControlLabel
                      value="Gt"
                      control={<Radio />}
                      label="Gt"
                      checked={course == "Gt"}
                      onChange={() => setCourse("Gt")}
                    />
                    <FormControlLabel
                      value="Ba"
                      control={<Radio />}
                      checked={course == "Ba"}
                      onChange={() => setCourse("Ba")}
                      label="Ba"
                    />
                    <FormControlLabel
                      value="DJ"
                      control={<Radio />}
                      checked={course == "DJ"}
                      onChange={() => setCourse("DJ")}
                      label="DJ"
                    />
                    <FormControlLabel
                      value="Uk"
                      control={<Radio />}
                      label="Uk"
                      checked={course == "Uk"}
                      onChange={() => setCourse("Uk")}
                    />
                    <FormControlLabel
                      value="Pf"
                      control={<Radio />}
                      label="Pf"
                      checked={course == "Pf"}
                      onChange={() => setCourse("Pf")}
                    />
                    <FormControlLabel
                      value="Vi"
                      control={<Radio />}
                      label="Vi"
                      checked={course == "Vi"}
                      onChange={() => setCourse("Vi")}
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
              <Box width="10vw" margin="auto" mt={5}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  登録
                </Button>
              </Box>
              <Box
                py={10}
                pr="20vw"
                textAlign="right"
                fontSize={20}
                borderRadius={2}
              >
                <Link href={`/shift/${user?.uid}`}>戻る</Link>
              </Box>
            </Box>
          </React.Fragment>
        </>
        <button onClick={hideModal}>Hide modal</button>
      </ReactModal>
    </>
  ));
  return <button onClick={showModal}>Show modal</button>;
};

const Hoge = () => {
  return (
    <ModalProvider>
      <UseRsvModal />
    </ModalProvider>
  );
};

export default Hoge;
