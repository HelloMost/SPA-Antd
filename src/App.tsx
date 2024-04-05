import React, { useState, useEffect } from 'react';
import { Table, Select, Input, DatePicker, Radio, Button, Space, Modal } from 'antd';
import { Flex } from 'antd';
import { useTranslation } from 'react-i18next';
import './app.scss';
import LanguageSwitcher from './components/languageSwitcher/languageSwitcher';

interface DataType {
  key: string;
  name: string;
  surname: string;
  birthdate: string;
  nationality: string;
  idNumber: string;
  gender: string;
  phone: string;
  passport: string;
  expectedSalary: string;
}

const App: React.FC = () => {
  const { t } = useTranslation();
  const [data, setData] = useState<DataType[]>(() => {
    const savedData = localStorage.getItem('formData');
    return savedData ? JSON.parse(savedData) : [];
  });
  const [name, setName] = useState<string>('');
  const [surname, setSurname] = useState<string>('');
  const [birthdate, setBirthdate] = useState<string>('');
  const [nationality, setNationality] = useState<string>('');
  const [idNumber, setIdNumber] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [passport, setPassport] = useState<string>('');
  const [expectedSalary, setExpectedSalary] = useState<string>('');
  const [editData, setEditData] = useState<DataType | null>(null);

  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(data));
  }, [data]);

  const handleSendData = () => {
    const newData: DataType = {
      key: (data.length + 1).toString(),
      name: name,
      surname: surname,
      birthdate: birthdate,
      nationality: nationality,
      idNumber: idNumber,
      gender: gender,
      phone: phone,
      passport: passport,
      expectedSalary: expectedSalary
    };

    setData([...data, newData]);
    clearInputFields();
  };

  const handleEditData = () => {
    if (!editData) return;
    const newData: DataType[] = data.map(item => {
      if (item.key === editData.key) {
        return {
          ...item,
          name: name,
          surname: surname,
          birthdate: birthdate,
          nationality: nationality,
          idNumber: idNumber,
          gender: gender,
          phone: phone,
          passport: passport,
          expectedSalary: expectedSalary
        };
      }
      return item;
    });

    setData(newData);
    setEditData(null);
    clearInputFields();
  };

  const handleDelete = (key: string) => {
    const newData = data.filter(item => item.key !== key);
    setData(newData);
  };

  const clearInputFields = () => {
    setName('');
    setSurname('');
    setBirthdate('');
    setNationality('');
    setIdNumber('');
    setGender('');
    setPhone('');
    setPassport('');
    setExpectedSalary('');
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Surname',
      dataIndex: 'surname',
      key: 'surname',
    },
    {
      title: 'Nationality',
      dataIndex: 'nationality',
      key: 'nationality',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record: DataType) => (
        <Space size="middle">
          <a onClick={() => setEditData(record)}>Edit</a>
          <a onClick={() => handleDelete(record.key)}>Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Flex justify='space-between'>
        <h1 className='text'>{t('title1')}</h1>
        <LanguageSwitcher />
      </Flex>
      <div className='container'>
        <Flex justify='start' align='center'>
          <p>{t('p1')}:</p>
          <Select
            defaultValue="คำนำหน้า"
            style={{ width: 120 }}
            options={[
              { value: 'นาย', label: 'นาย' },
              { value: 'นาง', label: 'นาง' },
              { value: 'นางสาว', label: 'นางสาว' }
            ]}
          />
          <p>{t('p2')}:</p>
          <Input
            placeholder="Name"
            style={{ width: '200px' }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <p>{t('p3')}:</p>
          <Input
            placeholder="Surname"
            style={{ width: '200px' }}
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
        </Flex>
        <Flex justify='start' align='center'>
          <p>{t('p4')}:</p>
          <DatePicker onChange={(date, dateString) => setBirthdate(dateString)} />
          <p>{t('p5')}:</p>
          <Select
            defaultValue="- - กรุณาเลือก - -"
            style={{ width: 445 }}
            options={[
              { value: 'Cambodia', label: 'Cambodia' },
              { value: 'Thai', label: 'Thai' },
              { value: 'Japanese', label: 'Japanese' }
            ]}
            value={nationality}
            onChange={(value) => setNationality(value)}
          />
        </Flex>
        <Flex justify='start' align='center'>
          <p>{t('p6')}:</p>
          <Input
            style={{ width: '200px' }}
            value={idNumber}
            onChange={(e) => setIdNumber(e.target.value)}
          />
        </Flex>
        <Flex justify='start' align='center'>
          <p>{t('p7')}:</p>
          <Radio.Group onChange={(e) => setGender(e.target.value)} value={gender}>
            <Radio value="man">{t('p11')}</Radio>
            <Radio value="woman">{t('p12')}</Radio>
            <Radio value="">{t('p13')}</Radio>
          </Radio.Group>
        </Flex>
        <Flex justify='start' align='center'>
          <p>{t('p8')}:</p>
          <Input
            style={{ width: '200px' }}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </Flex>
        <Flex justify='start' align='center'>
          <p>{t('p9')}:</p>
          <Input
            style={{ width: '200px' }}
            value={passport}
            onChange={(e) => setPassport(e.target.value)}
          />
        </Flex>
        <Flex justify='start' align='center'>
          <p>{t('p10')}:</p>
          <Input
            style={{ width: '200px' }}
            value={expectedSalary}
            onChange={(e) => setExpectedSalary(e.target.value)}
          />
          <Button type="primary" style={{ marginLeft: '2rem' }} onClick={handleSendData}>ส่งข้อมูล</Button>
        </Flex>
        <Modal
          title="Edit Data"
          visible={!!editData}
          onCancel={() => setEditData(null)}
          footer={[
            <Button key="cancel" onClick={() => setEditData(null)}>Cancel</Button>,
            <Button key="save" type="primary" onClick={handleEditData}>Save</Button>,
          ]}
        >
        </Modal>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default App;
