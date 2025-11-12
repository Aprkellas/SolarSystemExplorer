using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using MudBlazor.Services;
using SolarSystemExplorer.Client;

var builder = WebAssemblyHostBuilder.CreateDefault(args);


builder.RootComponents.Add<App>("#app");

builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });

builder.Services.AddMudServices();
builder.Services.AddMudBlazorDialog();
builder.Services.AddMudBlazorSnackbar();
builder.Services.AddMudBlazorResizeListener();

await builder.Build().RunAsync();
