import { atom,useRecoilState } from 'recoil'
import { useEffect, useState } from 'react'
import {
	getFirestore,
	collection,
	doc,
	getDoc,
	setDoc,
	Timestamp,
	query,
	where,
	orderBy,
	getDocs,
	QuerySnapshot,
	DocumentData,
	limit,
  } from "firebase/firestore";
//import in File 
import { User } from '../../models/User';
import { Users } from '../../models/Users';
import { FreeList } from '../../models/FreeList';
import { useAuth } from '../useUserAuth';
//create state use atom
const initialFreeSpace : Users[] = []
const initialError : boolean = false
export const SpaceState = atom({
	key:"users",
	default:initialFreeSpace,
})
export const errState = atom({
	key:"error",
	default:initialError,
})
// getFireStore 
const db = getFirestore()

export function useUsers() {
	const [usersList,setUsersList] = useRecoilState(SpaceState)
	function baseQuery() {
		return query (
			collection(db,"users"),
			where("role","==","student"),
		)
	}
	function baseLoading(snapshot:QuerySnapshot<DocumentData>) {
		const gotUsers = snapshot.docs.map((doc) => {
			const students = doc.data() as Users
			students.id = doc.id
			return students
 		})
		 setUsersList(gotUsers)
	}
	return {baseQuery,baseLoading,usersList}
 }

export function useUserList() {
	const {baseQuery,baseLoading} = useUsers();
	const {user} = useAuth()
	const [usersList,setUsersList] = useRecoilState(SpaceState)
	const [err,setErr] = useRecoilState(errState)
	async function loadUsers() {
		const q = query(
		  collection(db, "users"),
		  where("role", "==", "student"),
		  limit(10)
		);
		const snapshot = await getDocs(baseQuery());
		const gotUser = snapshot.docs.map((doc) => {
		  const user = doc.data() as Users;
		  user.id = doc.id;
		  return user;
		});
		setUsersList(gotUser);
	  }
	return {loadUsers,usersList}
}