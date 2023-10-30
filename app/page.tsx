"use client";

import web3auth from "@/lib/web3AuthInit";
import { useEffect, useState } from "react";
// import { Web3AuthNoModal } from "@web3auth/no-modal";
import { IProvider, WALLET_ADAPTERS } from "@web3auth/base";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import ClientLoginForm from "@/components/ClientLoginForm";

function App() {
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        await web3auth.init();
        setProvider(web3auth.provider);

        if (web3auth.connected) {
          setLoggedIn(true);
        }
      } catch (error) {
        console.error(error);
      }
    };
    init();
  }, []);


  const loginGoogle = async () => {
    const web3authProvider = await web3auth.connectTo(
      WALLET_ADAPTERS.OPENLOGIN,
      {
        loginProvider: "google",
      }
    );
    setProvider(web3authProvider);
    if (web3auth.connected) {
      setLoggedIn(true);
    }
  };


  const loginGithub = async () => {
    const web3authProvider = await web3auth.connectTo(
      WALLET_ADAPTERS.OPENLOGIN,
      {
        loginProvider: "github",
      }
    );
    setProvider(web3authProvider);
    if (web3auth.connected) {
      setLoggedIn(true);
    }
  };


  const getUserInfo = async () => {
    const user = await web3auth.getUserInfo();
    uiConsole(user);
  };

  const logout = async () => {
    await web3auth.logout();
    setProvider(null);
    setLoggedIn(false);
    uiConsole("logged out");
  };


  function uiConsole(...args: any[]): void {
    const el = document.querySelector("#console>p");
    if (el) {
      el.innerHTML = JSON.stringify(args || {}, null, 2);
      console.log(...args);
    }
  }

  const loggedInView = (
    <>
      <div className="flex">
        <div>
          <Button onClick={getUserInfo} >
            Get User Info
          </Button>
        </div>
        <div>
          <Button onClick={logout} >
            Log Out
          </Button>
        </div>
      </div>
    </>
  );

  const unloggedInView = (
    <div className="flex">
      <Button onClick={loginGoogle}>
        Login with google
      </Button>

      <Button onClick={loginGithub}>
        Login with github
      </Button>
    </div>
  );

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <h1 className="title">
        <a target="_blank" href="https://web3auth.io/docs/sdk/pnp/web/no-modal" rel="noreferrer">
          Web3Auth{" "}
        </a>
      </h1>

      <div className="grid">{loggedIn ? loggedInView : unloggedInView}</div>
      <div id="console" style={{ whiteSpace: "pre-line" }}>
        <p style={{ whiteSpace: "pre-line" }}></p>
      </div>

      <Card className="w-[420px] rounded-lg flex justify-center p-4">
        <Tabs defaultValue="Client" className="w-[400px] ">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="Client">Client</TabsTrigger>
            <TabsTrigger value="Auditor">Auditor</TabsTrigger>
          </TabsList>
          <TabsContent
            value="Client"
            className="flex flex-col justify-center my-5 space-y-5"
          >
            <ClientLoginForm login={loginGoogle} />


          </TabsContent>
          <TabsContent value="Auditor">
            <p>Auditor</p>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}

export default App;
