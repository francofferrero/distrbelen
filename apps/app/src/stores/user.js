import { defineStore } from 'pinia'
import router from '@/router'
import { auth } from '@/helpers/firebase'
import {
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import UsersService from '@/services/Users'
import { ROLES } from '@shared/constants/permissions'

const service = new UsersService()

export const useUserStore = defineStore('user', {
  state: () => ({
    userData: null,
    loadingUser: false,
    loading: false,
  }),
  getters: {
    fullname(state) {
      return `${state.userData.name} ${state.userData.lastname}`
    },
  },
  actions: {
    async signInWithEmail(email, password) {
      this.loadingUser = true
      try {
        const { user } = await signInWithEmailAndPassword(auth, email, password)
        this.userData = {
          uid: user.uid,
          email: user.email,
        }
        const userData = await service.read(this.userData.uid)
        this.userData = {
          ...this.userData,
          ...userData,
        }
        router.push('/dashboard')

        return { data: this.userData }
      } catch (err) {
        console.error(err)
        this.userData = {}
        return { err }
      } finally {
        this.loadingUser = false
      }
    },
    async resetPassword(email) {
      try {
        await sendPasswordResetEmail(auth, email)
        return { success: true }
      } catch (err) {
        console.error(err)
        return { err }
      }
    },
    async signOut() {
      return signOut(auth)
        .then(() => {
          this.userData = null
          router.push('/')
          return { success: true }
        })
        .catch((err) => {
          console.error(err)
          return { err }
        })
    },
    async currentUser() {
      return new Promise((resolve, reject) => {
        onAuthStateChanged(
          auth,
          async (user) => {
            if (user) {
              this.userData = {
                ...user,
              }
              const userData = await service.read(this.userData.uid)
              if (userData) {
                let permissions = {}
                const [rol] = userData.roles
                if (rol) {
                  permissions = ROLES[rol].sections
                }
                this.userData = {
                  ...this.userData,
                  ...userData,
                  permissions,
                }
              }
            } else {
              this.userData = null
              router.push('/sign-in')
            }
            resolve(this.userData)
          },
          (err) => {
            this.userData = null
            reject(err)
          },
        )
      })
    },
  },
})
