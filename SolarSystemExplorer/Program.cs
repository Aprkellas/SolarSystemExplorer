var builder = WebApplication.CreateBuilder(args);

// If you’ll add Web API controllers later, keep this:
builder.Services.AddControllers();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error", createScopeForErrors: true);
    app.UseHsts();
}
else
{
    app.UseWebAssemblyDebugging();
}

app.UseHttpsRedirection();

// Serve the Blazor WASM files from the Client project
app.UseBlazorFrameworkFiles();
app.UseStaticFiles();

// If you added controllers:
app.MapControllers();

// Fall back to the Client's index.html
app.MapFallbackToFile("index.html");

app.Run();
