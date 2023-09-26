import * as xmlbuilder2 from 'xmlbuilder2';
import axios from 'axios';

export default async function calcShipping(
  zipDest,
  weightLb,
  weightOz,
  zipOrigin = '72753',
  container = '',
  service = 'Priority'
) {
  const xmlRoot = xmlbuilder2
    .create({ version: '1.0' })
    .ele('RateV4Request', { USERID: '479XHOBBS0569' })
    .ele('Package', { ID: '0' })
    .ele('Service')
    .txt(`${service}`)
    .up()
    .ele('ZipOrigination')
    .txt(`${zipOrigin}`)
    .up()
    .ele('ZipDestination')
    .txt(`${zipDest}`)
    .up()
    .ele('Pounds')
    .txt(`${weightLb}`)
    .up()
    .ele('Ounces')
    .txt(`${weightOz}`)
    .up()
    .ele('Container')
    .txt(`${container}`)
    .up()
    .up()
    .up();

  const xmlData = xmlRoot.end({ prettyPrint: true });
  const url =
    `https://secure.shippingapis.com/ShippingAPI.dll?API=RateV4&XML=` +
    encodeURIComponent(xmlData);

  const res = await axios.get(url);
  // converting to JSON object
  const data = xmlbuilder2.convert(res.data, { format: 'object' });
  // access postage cost

  const rate = data.RateV4Response.Package.Postage.Rate;

  return rate;
}
