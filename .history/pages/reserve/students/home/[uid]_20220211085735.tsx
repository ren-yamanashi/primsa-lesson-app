import {
  collection,
  getFirestore,
  query,
  getDocs,
  deleteDoc,
  doc,
  where,
  orderBy,
  startAt,
  endAt,
} from "firebase/firestore";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import { browser } from "process";
import Link_mui from "@mui/material/Link";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Grid from "@mui/material/Grid";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { blue, teal } from "@mui/material/colors";
import { useRouter } from "next/router";
//内部インポート
import { useAuth } from "../../../../hooks/useUserAuth";
import { Users } from "../../../../models/Users";
import Title from "../../../../components/atoms/Title";
import Header from "../../../../components/templates/Header";

//ユーザーリストの作成　名前に管理者があればユーザーの削除が可能。 メアドに @bee が入っていればシフトの登録が可能
export default function UsersList() {
  const [users, setUsers] = useState<Users[]>([]);
  const { user } = useAuth();
  const [err, setErr] = useState<boolean>(false);
  const [test, setTest] = useState<string>("");
  const router = useRouter();

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
      const db = getFirestore();
      const u = user;
      setTest(u.displayName);
      const q = query(
        collection(db, "users"),
        orderBy("email"),
        startAt("bee"),
        endAt("bee" + "\uf8ff")
      );
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        return;
      }
      //users一覧の展開
      const gotUsers = snapshot.docs.map((doc) => {
        const user = doc.data() as Users;
        user.id = doc.id;
        return user;
      });
      setUsers(gotUsers);
    }
    loadUser();
  }, [process, browser, user]);
  /**==============
   * ユーザー削除
   *=============*/
  const deleteUser = async (id: string, e: any) => {
    const db = getFirestore();
    const q = query(collection(db, "users"));
    e.stopPropagation();
    try {
      await deleteDoc(doc(db, "users", id));
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        return;
      }
      const gotUsers = snapshot.docs.map((doc) => {
        const user = doc.data() as Users;
        user.id = doc.id;
        return user;
      });
      setUsers(gotUsers);
    } catch (error) {
      console.log(error);
      setErr(true);
    }
  };
  return (
    <>
      <React.Fragment>
        <Header />
        <Box ml={3}>
          <Title>予約登録</Title>
        </Box>
        <Box display="flex" flexWrap="wrap">
          <>
            <Grid item xs={12} sm={4} lg={4} md={4}>
              <Box mb={3} display="flex" mx={2}>
                <CardContent
                  style={{
                    width: "100%",
                    borderRadius: "7px",
                    borderStyle: "solid",
                    borderWidth: "2px",
                    margin: "auto",
                  }}
                >
                  <Grid item xs={12} sm={14} lg={20} md={20}>
                    <CardMedia
                      component="img"
                      sx={{
                        borderRadius: "10%",
                        height: 240,
                      }}
                      image={"https://source.unsplash.com/random"}
                      alt="Icon"
                    />
                  </Grid>
                  <Box mt={3} textAlign="center">
                    <Button>講師から選ぶ</Button>
                  </Box>
                </CardContent>
              </Box>
            </Grid>
          </>
          <>
            <Grid item xs={12} sm={4} lg={4} md={4}>
              <Box mb={3} display="flex" mx={2}>
                <CardContent
                  style={{
                    width: "100%",
                    borderRadius: "7px",
                    borderStyle: "solid",
                    borderWidth: "2px",
                    margin: "auto",
                  }}
                >
                  <Grid item xs={12} sm={14} lg={20} md={20}>
                    <CardMedia
                      component="img"
                      sx={{
                        borderRadius: "10%",
                        height: 240,
                      }}
                      image={"https://source.unsplash.com/random"}
                      alt="Icon"
                    />
                  </Grid>
                  <Box mt={3} textAlign="center">
                    <Button>日付から選ぶ</Button>
                  </Box>
                </CardContent>
              </Box>
            </Grid>
          </>
        </Box>
        {err == true && (
          <Box textAlign="center">
            <Grid xs={12} sm={15}>
              <Alert variant="filled" severity="error" sx={{ m: 3 }}>
                エラー : 1度ホームに戻り、再度アクセスしてください
                <Button
                  onClick={() => {
                    setErr(false), router.push(`/home/${user.uid}`);
                  }}
                  size="small"
                  sx={{ color: "red", bgcolor: "whitesmoke", m: 1 }}
                >
                  了解
                </Button>
              </Alert>
            </Grid>
          </Box>
        )}
      </React.Fragment>
    </>
  );
}
