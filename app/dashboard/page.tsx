"use client";
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { web3auth } from '@/lib/web3AuthInit'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {

  const router = useRouter()

  const logout = async () => {
    await web3auth.logout();
    console.log("logged out")
    router.push('/')
  };

  const getUserInfo = async () => {
    const user = await web3auth.getUserInfo();
    alert(JSON.stringify(user, null, 2))
    console.log(user);
  };
  useEffect(() => {
    if (!web3auth.connected) {
      router.push('/')
    }
  }, [])
  return (
    <>
      <Card>
        <p>dashboard</p>

        <Button
          onClick={getUserInfo}
        >Info</Button>
        <Button
          onClick={logout}
        >Logout</Button>
      </Card>
    </>
  )
}
