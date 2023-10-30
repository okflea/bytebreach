"use client";

import { web3auth } from "@/lib/web3AuthInit";
import { useEffect, useState } from "react";
import { IProvider, WALLET_ADAPTERS } from "@web3auth/base";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ClientLoginForm from "@/components/ClientLoginForm";
import AuditorLoginForm from "@/components/AuditorLoginForm";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import ClientDetailsForm from "@/components/ClientDetailsForm";
import AuditorDetailsForm from "@/components/AuditorDetailsForm";

function App() {
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [userEmails, setUserEmails] = useState<string[]>([]);
  const [clientContactDetails, setClientContactDetails] = useState<boolean>(false);
  const [auditorContactDetails, setAuditorContactDetails] = useState<boolean>(false);

  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const init = async () => {
      try {

        const storedEmails = localStorage.getItem('userEmails');
        if (storedEmails) {
          setUserEmails(JSON.parse(storedEmails));
        }
        await web3auth.init();
        setProvider(web3auth.provider);
        if (web3auth.connected) {
          router.push('/dashboard')
        }
      } catch (error) {
        console.error(error);
      }
    };
    init();
  }, []);


  const loginGoogleClient = async () => {
    const web3authProvider = await web3auth.connectTo(
      WALLET_ADAPTERS.OPENLOGIN,
      {
        loginProvider: "google",
      }
    );
    setProvider(web3authProvider);
    if (web3auth.connected) {
      const user = await web3auth.getUserInfo();
      if (userEmails.includes(user.email || "")) {
        toast({
          title: "Successfully logged in",
          duration: 3000,
        })
        router.push('/dashboard')
      } else {
        //new form 
        // localStorage.setItem(
        //   'userEmails', JSON.stringify([...userEmails, user.email || ""])
        // )
        setClientContactDetails(true)
        toast({
          title: "Successfully logged in",
          description: "Please fill in details since this is your first time",
          duration: 3000,
        })
      }
    }
  };

  const loginGoogle = async () => {
    const web3authProvider = await web3auth.connectTo(
      WALLET_ADAPTERS.OPENLOGIN,
      {
        loginProvider: "google",
      }
    );
    setProvider(web3authProvider);
    if (web3auth.connected) {
      const user = await web3auth.getUserInfo();
      if (userEmails.includes(user.email || "")) {
        toast({
          title: "Successfully logged in",
          duration: 3000,
        })
        router.push('/dashboard')
      }
      else {
        //new form 
        // localStorage.setItem(
        //   'userEmails', JSON.stringify([...userEmails, user.email || ""])
        // )
        setAuditorContactDetails(true)
        toast({
          title: "Successfully logged in",
          description: "Please fill in details since this is your first time",
          duration: 3000,
        })
      }
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
      const user = await web3auth.getUserInfo();
      if (userEmails.includes(user.email || "")) {
        toast({
          title: "Successfully logged in",
          duration: 3000,
        })
        router.push('/dashboard')
      }
      else {
        //new form 
        // localStorage.setItem(
        //   'userEmails', JSON.stringify([...userEmails, user.email || ""])
        // )
        setAuditorContactDetails(true)
        toast({
          title: "Successfully logged in",
          description: "Please fill in details since this is your first time",
          duration: 3000,
        })
      }
    }
  };

  const loginWallet = async () => {
    const web3authProvider = await web3auth.connectTo(
      WALLET_ADAPTERS.WALLET_CONNECT_V2,
      {
        loginProvider: "walletConnect",
      }
    );
    setProvider(web3authProvider);
    if (web3auth.connected) {
      router.push('/dashboard')
    }
  }

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">

      <Card className="w-[440px] rounded-lg flex justify-center p-5">
        {
          (!clientContactDetails && !auditorContactDetails) &&
          (
            <Tabs defaultValue="Client" className="w-[400px] ">
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="Client">Client</TabsTrigger>
                <TabsTrigger value="Auditor">Auditor</TabsTrigger>
              </TabsList>
              <TabsContent
                value="Client"
                className="justify-center mt-10 mx-2 space-y-5"
              >
                <ClientLoginForm login={loginGoogleClient} />

              </TabsContent>
              <TabsContent
                value="Auditor"
                className=" justify-center mt-10 space-y-5"
              >
                <AuditorLoginForm
                  loginGoogle={loginGoogle}
                  loginGithub={loginGithub}
                  loginWallet={loginWallet}
                />

              </TabsContent>
            </Tabs>
          )
        }
        {clientContactDetails && (<ClientDetailsForm />)}
        {auditorContactDetails && (<AuditorDetailsForm />)}
      </Card>
    </div>
  );
}

export default App;
