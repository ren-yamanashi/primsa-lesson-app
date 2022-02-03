import React, { useEffect, useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import {
  collection,
  getFirestore,
  query,
  where,
  getDocs,
  doc,
  runTransaction,
} from "firebase/firestore";
import TextField from "@mui/material/TextField";
import { browser } from "process";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Input } from "@mui/material";
import { Button } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
//内部インポート
import { useAuth } from "../../../hooks/useUserAuth";
import { Users } from "../../../models/Users";
import Title from "../../atoms/Title";
import { getAuth, updateProfile } from "firebase/auth";
import { useRouter } from "next/router";

export default function UploadFile() {
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [name, setName] = useState<string>("");
  const [u, setU] = useState<Users[]>([]);
  const [url, setUrl] = useState("");
  const [test, setTest] = useState<string>("");
  const [test2, setTest2] = useState<string>("");
  const [test3, setTest3] = useState<string>("");
  const [sending, setSending] = useState<boolean>(false);
  const storage = getStorage();
  const { user } = useAuth();
  const db = getFirestore();
  const router = useRouter();
  //コレクション設定
  function getCollections() {
    const db = getFirestore();
    return {
      db,
      userCollection: collection(db, "users"),
    };
  }
  //ユーザーを取り出す
  useEffect(() => {
    if (!process.browser) {
      return;
    }
    if (user === null) {
      return;
    }
    /**========
     * Firebaseからユーザーを取得
     *========*/
    async function loadUser() {
      const x = user;
      setTest(x.displayName);
      setTest2(x.email);
      setTest3(x.photoURL);
      const q = query(collection(db, "users"), where("id", "==", user.uid));
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        return;
      }
      //ReserveList一覧の展開
      const gotUsers = snapshot.docs.map((doc) => {
        const user = doc.data() as Users;
        user.id = doc.id;
        return user;
      });
      setU(gotUsers);
    }
    loadUser();
  }, [process, browser, user]);
  /**=============
   * @param event 画像をFirebaseにアップロード
   *=============*/
  const onSubmit = async (event) => {
    event.preventDefault();
    if (image === "") {
      console.log("ファイルが選択されていません");
    }
    // アップロード処理
    setSending(true);
    console.log(sending);
    const storageRef = ref(storage, "/images/" + file.name);
    const uploadTask = uploadBytes(storageRef, file);
    const { db, userCollection } = getCollections();
    const auth = getAuth();
    const userRef = doc(userCollection);
    uploadTask.then((snapshot: any) => {
      //urlを取得
      getDownloadURL(storageRef).then((url) => {
        setUrl(url);
        console.log(url);
        runTransaction(db, async (t: any) => {
          //ドキュメントをアップデート
          t.update(doc(userCollection, user.uid), {
            url: url,
            displayName: name !== "" && name,
          });
        });
        updateProfile(auth.currentUser, {
          photoURL: url,
        });
      });
      setSending(false);
      console.log(sending);
      console.log(snapshot);
      console.log(user.photoURL);
      toast.success("アップロードが完了しました", {
        position: "bottom-left",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      router.reload();
    });
  };
  /**=============
   * @param event displayNameを変更する処理
   *=============*/
  const onSubmit2 = async (event) => {
    event.preventDefault();
    //displayNameの変更
    const { db, userCollection } = getCollections();
    const auth = getAuth();
    const userRef = doc(userCollection);
    await updateProfile(auth.currentUser, {
      displayName: name,
    });
    console.log(user.displayName);
    router.reload();
  };
  /**===========
   * @param event 画像をstateに保存する処理
   *===========*/
  function handleChange(event) {
    setFile(event.target.files[0]);
    setImage(file);
  }
  return (
    <>
      <React.Fragment>
        <Box ml={5}>
          <Title>プロフィール</Title>
        </Box>
        <Box textAlign="center">
          <Box mb={3}>
            <CardContent
              style={{
                width: "50%",
                height: "50%",
                borderRadius: "7px",
                borderStyle: "solid",
                borderWidth: "2px",
                margin: "auto",
              }}
            >
              <Typography sx={{ fontSize: 20, mx: "auto" }}>
                {`氏名: ${test}`}
              </Typography>
              <Box component="form" noValidate onSubmit={onSubmit2}>
                <Box width="30vw" margin="auto" display="flex">
                  <TextField
                    margin="normal"
                    required
                    id="name"
                    label="名前を変更"
                    fullWidth
                    defaultValue={test}
                    variant="standard"
                    sx={{ mr: 3 }}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ height: "30%", my: "auto" }}
                  >
                    更新
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Box>
          <Box mb={3}>
            <CardContent
              style={{
                width: "50%",
                height: "50%",
                borderRadius: "7px",
                borderStyle: "solid",
                borderWidth: "2px",
                margin: "auto",
              }}
            >
              <Box textAlign="center">
                <Typography sx={{ fontSize: 20, mx: "auto" }}>
                  {`メールアドレス: ${test2}`}
                </Typography>
              </Box>
            </CardContent>
          </Box>
        </Box>
        <Box textAlign="center" mb={3}>
          <CardContent
            style={{
              width: "50%",
              height: "50%",
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
                }}
                image={test3}
                alt="Icon"
              />
            </Grid>
            <Box component="form" noValidate onSubmit={onSubmit} m="center">
              <Button variant="contained" sx={{ mt: 3, mb: 2, ml: 5 }}>
                {`画像を選択 ${file?.name}`}
                <Input
                  sx={{ opacity: 0, appearance: "none", position: "absolute" }}
                  type="file"
                  onChange={handleChange}
                />
              </Button>
              <Button type="submit">ダウンロード</Button>
            </Box>
          </CardContent>
        </Box>
      </React.Fragment>
      <ToastContainer />
    </>
  );
}
