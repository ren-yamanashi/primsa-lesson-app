//外部インポート
import { getAuth, onAuthStateChanged,sendPasswordResetEmail, signInAnonymously } from 'firebase/auth'
import { atom,useRecoilState } from 'recoil'
import { useEffect } from 'react'
import {
	getFirestore,
	collection,
	doc,
	getDoc,
	setDoc,
  } from "firebase/firestore";
//内部インポート
import { User } from '../models/User';
import { FreeList } from '../models/FreeList';
//userState の方定義
export const userState = atom<User | null>({
	key:'user',
	default:null,
})
export const rsvState = atom<FreeList[] | null>({
	key:"reserve",
	default:null,
})
async function CreateUserIfNotFound(user:User) {
	const db = getFirestore();
	const usersCollection = collection(db,"users")
	const userRef = doc(usersCollection,user.uid)
	const document = await getDoc(userRef)
	if(document.exists()) {
		return
	}
	await setDoc(userRef,{
		userName:user.displayName,
		email:user.email,
		id:user.uid,
	})
}

export function useAuth() {
	//ステートに保管されているユーザーデータ
	const [user,setUser] = useRecoilState(userState);
	const [rsv,setRsv] = useRecoilState(rsvState)
	const today = new Date();
	const y = today.getFullYear();
  const m = today.getMonth();
  const d = today.getDate();
  let xxx = new Date(y, m, d, 12, 0, 0);
    //useEffectでサイレンンダリングを防止
	useEffect(() => {
		if(user !== null) {
			return
		}
		const auth = getAuth()
		//認証終了後...
		onAuthStateChanged(auth,function(firebaseUser) {
			if(firebaseUser) {
				console.log("set user")
				/**ユーザー情報をセット */
				const loginUser:User = {
					uid:firebaseUser.uid,
					displayName:firebaseUser.displayName,
					email:firebaseUser.email,
					photoURL:firebaseUser.photoURL
				}
				setUser(loginUser)
				CreateUserIfNotFound(loginUser)
			}else{
				//サインアウトしたら...
				setUser(null)
			}
		})
	},[])
	return {user}
}
