import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Component } from 'react';



class RigaProdotto extends Component {
  render() {
    const prodotto = this.props.prodotto;
    const nome = prodotto.disponibile ? (prodotto.nome) : (<strong style={{ color: 'red' }}>{prodotto.nome}</strong>);
    return (
      <>
        <span>{nome}</span>
        <span>{prodotto.prezzo}</span>
      </>
    );
  }
}


class RigaCategoriaProdotti extends Component {

  render() {
    return (
      <>
        <span className='category'>{this.props.prodotto.categoria}</span>
      </>
    );
  }
}


class TabellaProdotti extends Component {

  render() {
    const rigaProdotto = [];
    let categoryAlreadyEntered = null;

    this.props.prodotti.forEach(prodotto => {

      //ritorna solo i valori che NON sono disponibili
      if (this.props.soloDisponibili && !prodotto.disponibile) {
        return;
      }

      //categoria
      if(prodotto.categoria !== categoryAlreadyEntered ){
          rigaProdotto.push(
          <RigaCategoriaProdotti
            key={prodotto.categoria}
            prodotto={prodotto}
          />)
      }
      categoryAlreadyEntered = prodotto.categoria;

      //singolo prodotto
      rigaProdotto.push(
        <RigaProdotto
          key={prodotto.nome}
          prodotto={prodotto}
        />
      )

    });

    return (
      <>
        <div className='title-products'>
          <strong>name</strong>
          <strong>Price</strong>
        </div>

        <div className='tab'>{rigaProdotto}</div>
      </>
    );
  }
}



class BarraRicerca extends Component{
  constructor(props){
    super(props);
    this.handleSoloDisponibiliChange = this.handleSoloDisponibiliChange.bind(this);
  }


  handleSoloDisponibiliChange(e) {
    this.props.onInStockChange(e.target.checked);
  }

  render(){
    return(
      <form>
      <p>
        <input type='checkbox'
          checked={this.props.soloDisponibili}
          onChange={this.handleSoloDisponibiliChange}>
        </input>
        Mostra solo disponibili
      </p>
      </form>
    )
  }
}

class TabellaProdottiRicercabile extends Component{

  constructor(props){
    super(props);
    this.state = {
      soloDisponibili: false,
    }

    this.handleSoloDisponibiliChange = 
      this.handleSoloDisponibiliChange.bind(this);
  }

 
  handleSoloDisponibiliChange(soloDisponibili) {
    this.setState({
      soloDisponibili: soloDisponibili,
    });
  }

  render(){
    return(
      <>
        <BarraRicerca 
          soloDisponibili={this.state.soloDisponibili}
          onInStockChange={this.handleSoloDisponibiliChange}
        />
        <TabellaProdotti 
          prodotti={this.props.prodotti} 
          soloDisponibili={this.state.soloDisponibili}
          />
      </>
    );
  }
}






const PRODOTTI = [
  { categoria: "Attrezzatura Sportiva", prezzo: "$49.99", disponibile: true, nome: "Palla da calcio" },
  { categoria: "Attrezzatura Sportiva", prezzo: "$9.99", disponibile: true, nome: "Palla da tennis" },
  { categoria: "Attrezzatura Sportiva", prezzo: "$29.99", disponibile: false, nome: "Palla da canestro" },
  { categoria: "Elettronica", prezzo: "$99.99", disponibile: true, nome: "iPod Touch" },
  { categoria: "Elettronica", prezzo: "$399.99", disponibile: false, nome: "iPhone 5" },
  { categoria: "Elettronica", prezzo: "$199.99", disponibile: true, nome: "Nexus 7" }
];


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <TabellaProdottiRicercabile prodotti={PRODOTTI}/>
  </React.StrictMode>
);