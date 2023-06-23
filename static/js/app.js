/*Program source for the code.
  Corey Monsma
  June 21, 2023
*/

/* read in the data and then present it with various JS or JSON techniques
*/

//Use the D3 library to read in samples.json from the URL
//set the string for the URL 
// Get the data endpoint
const fullDataSet = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
//Similar to class 
// Fetch the JSON data and console log it  

// only to confirm data was read completely
 function buildCharts(sample)
 {
  d3.json(fullDataSet).then(function(data) {
    
    //Use sample_values as the values for the bar chart.
    let sample_values = data.samples;
    let temp = sample_values.filter(obj=>obj.id==sample)
  
    let myresults = temp[0];
    let graph_sample_values = myresults.sample_values;
    let otu_ids = myresults.otu_ids;
    let otu_labels = myresults.otu_labels;

    let yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
    let xticks = graph_sample_values.slice(0, 10).reverse();
    let g_lables = otu_labels.slice(0, 10).reverse();

    // build the hori chart
    //Build trace
    let trace = {
      x: xticks, //sample values
      y: yticks, //labels
      type: "bar",
      orientation: "h",
      text: g_lables
    };
  
    //layout 
    let graph_data = [trace];
    //use Plot 
    Plotly.newPlot("bar", graph_data);    
   });
  };

  function buildPopCharts(sample)
  {
   d3.json(fullDataSet).then(function(data) {
/*
Create a bubble chart that displays each sample.
Use otu_ids for the x values.
Use sample_values for the y values.
Use sample_values for the marker size.
Use otu_ids for the marker colors.
Use otu_labels for the text values.
*/
//Use sample_values as the values for the bar chart.
     let sample_values = data.samples;
     let temp = sample_values.filter(obj=>obj.id==sample)
   
     let myresults = temp[0];
     let graph_sample_values = myresults.sample_values;
     let otu_ids = myresults.otu_ids;
     let otu_labels = myresults.otu_labels;
 
    // console.log(myresults);
 
     let xticks = otu_ids.map(otuID => `OTU ${otuID}`);
     let yticks = graph_sample_values;
     let g_lables = otu_labels;
 
     //Build trace
     var trace1 = {
      x: xticks,
      y: yticks,
      mode: 'markers',
      marker: {
        color: xticks,
        size: yticks
      },
      text:g_lables 
    };
    
    var data1 = [trace1];
    
    Plotly.newPlot('bubble', data1);
    });
   };

/////////////////////////////////////////////////////////////////////////////////////
   function buildGageCharts(sample)
   {
 d3.json(fullDataSet).then(function(data) {
 //Use sample_values as the values for the bar chart.
 let sample_values = data.metadata;
// console.log(data);
 let temp = sample_values.filter(obj=>obj.id==sample)
// console.log(temp[0]);
 let metadata = temp[0];
 let id = metadata.id;
 let eth = metadata.ethnicity;
 let sex = metadata.gender;
 let age = metadata.age;
 let loc = metadata.location;
 let bbt = metadata.bbtype;
 let fre = metadata.wfreq;
 let panelBody = d3.select(".panel-body");

//  for (i=0;i < 8;i++)
// {
// panelBody.remove("h3");
// };
   panelBody.append("h3").text(`id: ${id}`);
   panelBody.append("h3").text(`ethnicity: ${eth}`);
   panelBody.append("h3").text(`gender: ${sex}`);
   panelBody.append("h3").text(`age: ${age}`);
   panelBody.append("h3").text(`location: ${loc}`);
   panelBody.append("h3").text(`bbtype: ${bbt}`);
   panelBody.append("h3").text(`wfreq: ${fre}`);

     });
    };
///////////////////////////////////////////////////////////////////////////////////////////////
function buildOptions()
{
 d3.json(fullDataSet).then(function(data) {
//Get the list of name/numbers from the JSON file pull
let name_values = data.names;
//get the html selection option we want to add our options in.
let selectD = d3.select("#selDataset");

// Assign the value of the dropdown menu option to a letiable
//let dataset = dropdownMenu.property("value");
// Initialize an empty array for the country's data

for(i=0;i<name_values.length;i++)
 {
 //let val = selectD.property("value"); 
  selectD.append("option").text(name_values[i]);
//  selectD.setAttribute("value",name_values[i]);
 };
  });
 };
///////////////////////////////////////////////////////////////////////////////////////////////
//optionChanged(this.value)
//similar to class exercise 3 final demo
// On change to the DOM, call getData()
function optionChanged(value)
{
 //alert('corey');
 //alert(value);
 let iValue = parseInt(value);
 console.log(iValue);
  buildCharts(iValue);
  buildPopCharts(iValue);
  buildGageCharts(iValue);
 //buildOptions();

};
/////////////////////////////////////////////////////////////////////////////////////////////
// only to confirm data was read completely

/////////////////////////////////////////////////////////////////////////////////////////////
 buildPopCharts(940);
 buildCharts(940);
 buildGageCharts(940);
 buildOptions();

//Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.

