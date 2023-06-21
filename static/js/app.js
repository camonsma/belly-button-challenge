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
 console.log(data);
 let temp = sample_values.filter(obj=>obj.id==sample)
 console.log(temp[0]);
 //let myresults = temp[0];
 //let graph_sample_values = myresults.sample_values;
 //let otu_ids = myresults.otu_ids;
 //let otu_labels = myresults.otu_labels;

 
     });
    };

 /////////////////////////////////////////////////////////////////////////////////////////////
 buildPopCharts(940);
 buildCharts(940);
 buildGageCharts(940);
 
//Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.

