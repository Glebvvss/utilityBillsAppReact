import React, {useState} from 'react';
import CalculatorBillsItem from '../CalculatorBillsItem'
import './CalculatorBills.css';

function calculateTheCostWithTariff(previousValue, currentValue, tariff) {
  return (Math.abs(currentValue - previousValue)) * tariff;
}

function calculateFullCost(...costBills) {
  return costBills.reduce((totalValue, bill) => {
    return totalValue + bill;
  }, 0).toFixed(2);
}

const CalculatorBills = () => {
  //TODO: Вынести во внешний ресурс
  const garbageBills = 25.02;
  const homeMaintenance = 267.33; 
  const rentBills = 5000;

  const waterTariff = 25.28;
  const electricityTariff = 1.68; 


  const [previousWaterValue, setPreviousWaterValue] = useState('');
  const [currentWaterValue, setCurrentWaterValue] = useState('');
  const [previousElectricityValue, setPreviousElectricityValue] = useState('');
  const [currentElectricityValue, setCurrentElectricityValue] = useState('');
  const [totalCost, setTotalCost] = useState('');

  //TODO: Негибкая система, много повторяющегося кода(как-то нужно оптимизировать)
  //TODO: Продумать валидирование ввода в инпут и вывод popup(отдельный компонент)
  //TODO: Добавить функционал добавление нового платежа (допусти за газ) и редактирование существующего
  const onInputPreviousWaterValue = (event) => {
    setPreviousWaterValue(event.currentTarget.value);
  }
  
  const onInputCurrentWaterValue = (event) => {
    setCurrentWaterValue(event.currentTarget.value);
  } 
  
  const onInputPreviousElectricityValue = (event) => {
    setPreviousElectricityValue(event.currentTarget.value);
  }
  
  const onInputCurrentElectricityValue = (event) => {
    setCurrentElectricityValue(event.currentTarget.value);
  } 

  const validateInputValues = (...values) => {
    return values.every(value => value.match(/^[0-9]+$/));
  }

  const calculateTheCost = (event) => {
    event.preventDefault();
    const isValid = validateInputValues(previousWaterValue, currentWaterValue, previousElectricityValue, currentElectricityValue);
    
    if(isValid) {
      const waterBill = calculateTheCostWithTariff(previousWaterValue, currentWaterValue, waterTariff);
      const electricityBill = calculateTheCostWithTariff(previousElectricityValue, currentElectricityValue, electricityTariff);
      setTotalCost(calculateFullCost(homeMaintenance, garbageBills, waterBill, electricityBill, rentBills));  
    } else {
      alert("Введите значения");
    }
  }


  return (
    <div className="calculator-bills">
      <div className="calculator-bills__container">
        <header className="calculator-bills__header">
          <h1 className="calculator-bills__title title"> Расчет аренды квартиры с коммуналкой </h1>
        </header>
        <form className="bills" onSubmit={calculateTheCost}>
          <div className="static-bill bill">
            <h2 className="title bill__title static-bill__title">Статические счета</h2>
            <ul className="static-bill__list">
              <li className="static-bill__item">
                Аренда квартиры: {rentBills} грн
              </li>
              <li className="static-bill__item">
                Счет за мусор: {garbageBills} грн
              </li>
              <li className="static-bill__item">
                Счет за обслуживание дома: {homeMaintenance} грн
              </li>
            </ul>
          </div>
          <div className="calculator-bills__list">
            <CalculatorBillsItem title='Вода' tariff={waterTariff} 
                                 previousValue={previousWaterValue} 
                                 currentValue={currentWaterValue}
                                 onInputPreviousValue={onInputPreviousWaterValue}
                                 onInputCurrentValue={onInputCurrentWaterValue}
            />
            <CalculatorBillsItem title='Электричество' tariff={electricityTariff}
                                 previousValue={previousElectricityValue} 
                                 currentValue={currentElectricityValue}
                                 onInputPreviousValue={onInputPreviousElectricityValue}
                                 onInputCurrentValue={onInputCurrentElectricityValue}
            />
          </div>
            {/*TODO: Более подробный вывод, чтобы было понятно как посчитано?*/ }
            {totalCost && <div className="calculator-bills__total-cost title"> Итоговая цена: {totalCost}</div>}
         
          <input type="submit" className="calculator-bills__button" value="Расчитать"/>
        </form>
      </div>
    </div>
  );
}

export  default CalculatorBills;