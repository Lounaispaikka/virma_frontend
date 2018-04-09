import React from 'react';
import { observer } from 'mobx-react';
import { Modal, ButtonToolbar, Button, Form, FormGroup, FormControl, ControlLabel, Checkbox } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import { data, login } from '../../../model/store';
import { appUrls } from '../../../config';

import { ToggleEditor } from './editors/ToggleEditor';
import { SelectEditor } from './editors/SelectEditor';
import AddNewUser from '../utilModals/AddNewUser';

import '../../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css!';
import '../../../../css/modal.css!';
import '../../../../css/customBootstrap.css!';

@observer
export class ManageUsersModal extends React.Component<any, any> {
  private table: BootstrapTable;

  constructor(props: any) {
    super(props);

    this.state = {
      users: [],
      loading: true,
      form: {
        username: undefined,
        password: undefined,
        email: undefined,
        organization: "Aura",
        customOrganization: undefined,
        admin: false,
        updater_id: undefined
      },
      disableOrganization: false,
      showCustomOrganization: false,
      selectedUser: {},
      selectedUserKey: null,
      addUserInfo: false
    };

    this.updateUsers = this.updateUsers.bind(this);
    this.onDeleteRow = this.onDeleteRow.bind(this);
    this.handleRowSelect = this.handleRowSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addNewUser = this.addNewUser.bind(this);
    this.hideAddNewUser = this.hideAddNewUser.bind(this);
  }

  componentDidMount() {
    this.sendApiCall('GET', null, appUrls.users).then(response => response.json())
      .then(response => {
        this.setState({ users: response, loading: false });
      }).catch(e => console.log(e));
  }

  sendApiCall(method, body, url) {
    let queryOptions = {};
    if (body) {
      queryOptions = {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ body: body, user: login.loggedUser })
      };
    } else {
      queryOptions = {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      };
    }

    return fetch(url, queryOptions);
  }

  updateUsers() {
    this.state.users.forEach(user => {
      this.sendApiCall('POST', user, appUrls.updateUser).then(response => response.json()).catch(e => console.log(e));
    });
  }

  onDeleteRow(username) {
    const newUsers = this.state.users.filter((user) => {
      if (user.username === username[0]) { return false; }
      return true;
    });

    this.setState({ users: newUsers });

    this.sendApiCall('POST', username, appUrls.removeUser).then(response => response.json())
      .then(response => {
        console.log(response);
      }).catch(e => console.log(e));
  }

  handleRowSelect(row, isSelected, event, key) {
    this.setState({ selectedUserKey: key });
  }

  addNewUser(e) {
    this.setState({ addUserInfo: false });
    this.table.setState({ selectedRowKeys: [] });

    const user = {
      username: this.state.form.username,
      password: this.state.form.password,
      email: this.state.form.email,
      organization: this.state.showCustomOrganization ? this.state.form.customOrganization : this.state.form.organization,
      admin: this.state.form.admin === 'on' ? true : false,
      updater_id: this.state.form.updater_id
    }

    this.table.handleAddRow(user);
    this.setState({
      users: this.state.users.concat([user]),
      form: { organization: "Aura" },
      disableOrganization: false,
      showCustomOrganization: false
    });

    // Add user to db
    this.sendApiCall('POST', user, appUrls.addUser).then(response => response.json())
      .then(response => {
        console.log(response);
      }).catch(e => console.log(e));
  }

  deleteButton = (removeRowEvent) => {
    return (<Button id={"square-button-table-danger"} onClick={() => removeRowEvent([this.state.selectedUserKey])}>Poista käyttäjä</Button>)
  }

  insertButton = (addRowEvent) => {
    return (<Button id={"square-button-table-primary"} onClick={() => this.setState({ addUserInfo: true})}>Lisää käyttäjä</Button>)
  }

  unselectButton = () => {
    return <Button id={"square-button-table-warning"} onClick={() => this.table.setState({selectedRowKeys: []})}>Poista valinta</Button>
  }

  customConfirm(next, dropRowKeys) {
    if (confirm('Haluatko poistaa käyttäjän?')) { next(); }
  }

  rowClassNameFormat(row, rowIdx) {
    return rowIdx % 2 === 0 ? 'td-columnn-even' : 'td-column-odd';
  }

  hideAddNewUser() {
    this.setState({
      addUserInfo: false,
      form: { organization: "Aura" },
      disableOrganization: false,
      showCustomOrganization: false
    });
  }

  handleChange(event) {
    if (event.target.id === 'organization') {
      event.target.value === 'Muu organisaatio' ?
        this.setState({ showCustomOrganization: true, disableOrganization: true })
        :
        this.setState({ showCustomOrganization: false, disableOrganization: false })
    }

    this.setState({
      form: { ...this.state.form, [event.target.id]: event.target.value }
    });
  }

  render() {
    const {
      showManageUsersModal,
      hideManageUsersModal,
    } = this.props;

    const toggleEditor = (onUpdate, props) => (<ToggleEditor onUpdate={onUpdate} {...props}/>);
    const selectEditor = (onUpdate, props) => (<SelectEditor onUpdate={onUpdate} {...props}/>);

    const cellEditProp: any = {
      mode: "click",
      blurToSave: true
    };

    const selectRowProp: any = {
      mode: "radio",
      bgColor: "lightBlue",
      onSelect: this.handleRowSelect
    };

    const options: any = {
      defaultSortName: "username",
      defaultSortOrder: "asc",
      noDataText: this.state.loading ? "Ladataan käyttäjiä" : "Käyttäjiä ei pystytty hakemaan",
      insertBtn: this.insertButton,
      deleteBtn: this.deleteButton,
      exportCSVBtn: this.unselectButton,
      onDeleteRow: this.onDeleteRow,
      handleConfirmDeleteRow: this.customConfirm
    };

    return (
      <div>
        <Modal backdrop={"static"} bsSize={"large"} show={showManageUsersModal} onHide={(e) => hideManageUsersModal(e)}>
          <Modal.Header>
            <Modal.Title>
              <b>Hallitse käyttäjiä ja niiden oikeuksia</b>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Voit poistaa käyttäjän valitsemalla sen ja painamalla "Poista valinta" -painiketta.
              "Listaa käyttäjä" -painikkeella avautuu lomake, johon on mahdollista lisätä uusi käyttäjä. Uuden käyttäjän salasanan voi vaihtaa luomalla sen uudestaan kirjautumisen yhteydessä
              "Salasana unohtunut?" -painikkeen kautta.
              "Poista käyttäjä" -painikkeella pystyy lopullisesti poistamaan valitun käyttäjän.
            </p>

            <BootstrapTable
              ref={(table) => { this.table = table; }}
              data={this.state.users}
              cellEdit={cellEditProp}
              selectRow={selectRowProp}
              options={options}
              insertRow
              deleteRow
              exportCSV
              keyField={"username"}
            >
              <TableHeaderColumn dataField={"username"} dataSort>Käyttäjätunnus</TableHeaderColumn>
              <TableHeaderColumn dataField={"email"} dataSort>Sähköposti</TableHeaderColumn>
              <TableHeaderColumn dataField={"organization"} customEditor={{ getElement: selectEditor }} dataSort>Organisaatio</TableHeaderColumn>
              <TableHeaderColumn dataField={"admin"} customEditor={{ getElement: toggleEditor }} dataSort>Admin</TableHeaderColumn>
              <TableHeaderColumn dataField={"updater_id"} dataSort>Päivittäjätunnus</TableHeaderColumn>
            </BootstrapTable>

            <AddNewUser
              showAddNewUser={this.state.addUserInfo}
              hideAddNewUser={this.hideAddNewUser}
              addNewUser={this.addNewUser}
              handleChange={this.handleChange}
              formState={this.state.form}
              disableOrganization={this.state.disableOrganization}
              showCustomOrganization={this.state.showCustomOrganization}
            />
          </Modal.Body>
          <Modal.Footer>
            <ButtonToolbar className={"pull-right"}>
              <Button id={"square-button-primary"} bsStyle={"primary"} onClick={(e) => this.updateUsers()}>Vahvista kenttien muutokset</Button>
              <Button id={"square-button-warning"} bsStyle={"warning"} onClick={(e) => hideManageUsersModal(e)}>Sulje</Button>
            </ButtonToolbar>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
