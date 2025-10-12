"use server";
import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";

export async function SignUp(params: SignUpParams) {
  const { uid, name, email } = params;
  try {
    const userData = await db.collection("users").doc(uid).get();
    if (userData.exists) {
      return {
        success: false,
        message: "User already exist , sign in instead",
      };
    }
    await db.collection("users").doc(uid).set({
      name,
      email,
    });
    return {
      success: true,
      message: "account created successfully. Please sign in.",
    };
  } catch (e: any) {
    console.log("Error creating a user", e);
    if (e.code === "auth/email-already-exist") {
      return {
        success: false,
        message: "This email is already in use",
      };
    }
    return {
      success: false,
      message: "Failed to create an account",
    };
  }
}
export async function SignIn(params: SignInParams) {
  const { email, idToken } = params;
  try {
    const userData = await auth.getUserByEmail(email);
    if (!userData) {
      return {
        success: false,
        message: "User doesnot exist Create an account",
      };
    }
    await setSessionCookie(idToken);
  } catch (e) {
    console.log(e);
    return {
      success: false,
      message: "Failed to log in ",
    };
  }
}
export async function setSessionCookie(idToken: string) {
  const cookieStore = await cookies();
  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: 60 * 60 * 24 * 7 * 1000,
  });
  cookieStore.set("session", sessionCookie, {
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  });
}
export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();

  const sessionCookie = cookieStore.get("session")?.value;
  if (!sessionCookie) return null;
  try {
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
    const userRecord = await db
      .collection("users")
      .doc(decodedClaims.uid)
      .get();

    if (!userRecord.exists) return null;
    return {
      ...userRecord.data(),
      id: userRecord.id,
    } as User;
  } catch (e) {
    console.log(e);
    return null;
  }
}
export async function isAuthenticated() {
  const user = await getCurrentUser();
  // console.log(user);
  return !!user;
}
