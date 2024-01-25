import List from "antd/lib/list";
import React from "react";
import { useGetState } from "recell";
import accountsCell from "../../cells/accounts";
import If from "../if";
import Account from "./account";
import AccountNotExist from "./account-does-not-exist";
import LoadingAccounts from "./loading-accounts";

const AccountList: React.FC = () => {
  const loading = useGetState(accountsCell, (state) => state.loading);
  const accounts = useGetState(accountsCell, (state) => state.accounts);

  return (
    <If condition={loading}>
      <If.True>
        <LoadingAccounts />
      </If.True>
      <If.False>
        <If condition={accounts.length === 0}>
          <If.True>
            <AccountNotExist />
          </If.True>
          <If.False>
            <List
              bordered={false}
              header={undefined}
              dataSource={accounts}
              renderItem={(address) => (
                <List.Item>
                  <Account address={address} />
                </List.Item>
              )}
            />
          </If.False>
        </If>
      </If.False>
    </If>
  );
};

export default AccountList;
