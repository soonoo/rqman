import { cloneDeep } from "lodash";
import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

interface IConfig {
  accounts: {
    username: string;
    password: string;
    isActive?: boolean;
  }[],
}

const CONFIG_KEY = "@@RQMAN_CONFIG";

export const getConfig = () => {
  const config = localStorage.getItem(CONFIG_KEY);
  if (config) {
    return JSON.parse(config) as IConfig;
  }

  return {
    accounts: [],
  };
}

const defaultConfig: IConfig = {
  accounts: [],
};

export const useConfig = () => {
  const [config, setConfig] = useState<IConfig>(defaultConfig);
  const [_config, _setConfig] = useLocalStorage<IConfig>(CONFIG_KEY, {
    accounts: [],
  });

  // Prevent SSR mismatch:
  // useLocalStorage returns default value on server side.
  useEffect(() => {
    setConfig(_config);
  }, [_config])
  
  const addAccount = (account: { username: string; password: string; isActive?: boolean }) => {
    const c = cloneDeep(_config);
    if (c.accounts.find(u => u.username === account.username)) {
      return;
    }

    if (c.accounts.length === 0) {
      account.isActive = true;
    }
    c.accounts.push(account);
    _setConfig(c);
  }

  const activateAccount = (targetIndex: number) => {
    const c = cloneDeep(_config);
    for (let i = 0; i < c.accounts.length; i++) {
      c.accounts[i].isActive = i === targetIndex;
    }
    _setConfig(c);
  }

  const removeAccount = (targetIndex: number) => {
    const c = cloneDeep(_config);
    c.accounts.splice(targetIndex, 1);
    _setConfig(c);
  }

  return {
    config,
    addAccount,
    activateAccount,
    removeAccount,
  };
}
