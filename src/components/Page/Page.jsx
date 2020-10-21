import React from "react";
import {Card, Container} from "react-bootstrap";

// wrapper wizualny do każdej z następnych stron (albo większości)
// dzięki temu Container, Card itd wystarczy wystylizować tylko raz i będzie śmigało

// przekazuję props, bo niekoniecznie będę miał jakiekolwiek propsy przsekazywane
const Page = (props) => (
    <Container>
        <Card>
            {
                //jeżeli props.header istnieje (i nie jest ""), to wyrenderuj kod w nawiasie
                props.header && (
                    <Card.Header>
                        {props.header}
                    </Card.Header>
                )
            }
            <Card.Body>
                {
                //    children to jest prop, którego nie trzeba definiować jako atrybut przy wywołaniu komponentu
                //    wystarczy zacząć pisać dzieci ;)
                }
                {props.children}
            </Card.Body>
        </Card>
    </Container>
);

// dzięki powyższemu obydwa zastosowania są poprawne:
// <Page>
//      <h1>cześć</h1>
// </Page>
//
// <Page header="Karta z napisem cześć">
//      <h1>cześć</h1>
// </Page>
//

export default Page;